import { getFamilyId, jsonError } from "@/lib/api-helpers";
import { generateStoryWithAI } from "@/lib/ai-story-service";
import { profiles, stories, subscriptions } from "@/lib/in-memory-store";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const storyRequestSchema = z.object({
  profileId: z.string().min(1),
  theme: z.string().min(2).max(40),
});

export async function GET(request: NextRequest) {
  const familyId = getFamilyId(request);
  const familyProfiles = profiles.filter((profile) => profile.familyId === familyId);
  const profileIds = new Set(familyProfiles.map((profile) => profile.id));

  return NextResponse.json({
    data: stories.filter((story) => profileIds.has(story.profileId)),
  });
}

export async function POST(request: NextRequest) {
  const familyId = getFamilyId(request);
  const body = await request.json();
  const parsed = storyRequestSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError("Solicitud de cuento inválida", 422);
  }

  const profile = profiles.find(
    (item) => item.id === parsed.data.profileId && item.familyId === familyId,
  );

  if (!profile) {
    return jsonError("Perfil no encontrado", 404);
  }

  if (profile.readingMinutesToday >= profile.maxMinutesPerDay) {
    return jsonError("Límite diario de lectura alcanzado", 403);
  }

  const subscription = subscriptions.find((item) => item.familyId === familyId);
  if (!subscription || !subscription.active) {
    return jsonError("Suscripción inactiva", 403);
  }

  if (subscription.storiesGeneratedThisMonth >= subscription.monthlyLimit) {
    return jsonError("Has alcanzado el límite mensual de generación", 403);
  }

  const story = generateStoryWithAI({
    profileId: profile.id,
    age: profile.age,
    theme: parsed.data.theme,
    childName: profile.name,
    interests: profile.interests,
  });

  stories.unshift(story);
  subscription.storiesGeneratedThisMonth += 1;

  return NextResponse.json({ data: story }, { status: 201 });
}
