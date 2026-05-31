import { getFamilyId, jsonError } from "@/lib/api-helpers";
import { validateAge } from "@/lib/age-groups";
import { profiles } from "@/lib/in-memory-store";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2).max(40),
  age: z.number().int().min(0).max(8),
  interests: z.array(z.string().min(2).max(30)).max(6).default([]),
  maxMinutesPerDay: z.number().int().min(5).max(180).default(30),
  contentFilters: z.array(z.string()).max(8).default([]),
});

export async function GET(request: NextRequest) {
  const familyId = getFamilyId(request);
  const items = profiles.filter((profile) => profile.familyId === familyId);

  return NextResponse.json({ data: items });
}

export async function POST(request: NextRequest) {
  const familyId = getFamilyId(request);
  const body = await request.json();
  const parsed = profileSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError("Datos de perfil inválidos", 422);
  }

  if (!validateAge(parsed.data.age)) {
    return jsonError("La edad debe estar entre 0 y 8 años", 422);
  }

  const newProfile = {
    id: `profile-${crypto.randomUUID()}`,
    familyId,
    name: parsed.data.name,
    age: parsed.data.age,
    interests: parsed.data.interests,
    readingMinutesToday: 0,
    maxMinutesPerDay: parsed.data.maxMinutesPerDay,
    contentFilters: parsed.data.contentFilters,
  };

  profiles.push(newProfile);

  return NextResponse.json({ data: newProfile }, { status: 201 });
}
