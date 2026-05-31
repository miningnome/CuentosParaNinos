import { getFamilyId, jsonError } from "@/lib/api-helpers";
import { profiles, readingProgress, stories } from "@/lib/in-memory-store";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const progressSchema = z.object({
  profileId: z.string().min(1),
  storyId: z.string().min(1),
  minutesRead: z.number().int().min(1).max(180),
  completed: z.boolean().default(false),
});

export async function GET(request: NextRequest) {
  const familyId = getFamilyId(request);
  const familyProfileIds = new Set(
    profiles.filter((item) => item.familyId === familyId).map((item) => item.id),
  );

  return NextResponse.json({
    data: readingProgress.filter((item) => familyProfileIds.has(item.profileId)),
  });
}

export async function POST(request: NextRequest) {
  const familyId = getFamilyId(request);
  const parsed = progressSchema.safeParse(await request.json());

  if (!parsed.success) {
    return jsonError("Datos de progreso inválidos", 422);
  }

  const profile = profiles.find(
    (item) => item.id === parsed.data.profileId && item.familyId === familyId,
  );

  if (!profile) {
    return jsonError("Perfil no encontrado", 404);
  }

  const story = stories.find((item) => item.id === parsed.data.storyId);

  if (!story || story.profileId !== profile.id) {
    return jsonError("Cuento no encontrado", 404);
  }

  const progress = {
    id: `progress-${crypto.randomUUID()}`,
    profileId: parsed.data.profileId,
    storyId: parsed.data.storyId,
    minutesRead: parsed.data.minutesRead,
    completed: parsed.data.completed,
    lastReadAt: new Date().toISOString(),
  };

  readingProgress.unshift(progress);
  profile.readingMinutesToday = Math.min(
    profile.readingMinutesToday + parsed.data.minutesRead,
    profile.maxMinutesPerDay,
  );

  return NextResponse.json({ data: progress }, { status: 201 });
}
