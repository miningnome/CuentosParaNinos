import { getFamilyId, jsonError } from "@/lib/api-helpers";
import { profiles } from "@/lib/in-memory-store";
import { getRecommendations } from "@/lib/recommendation-engine";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const familyId = getFamilyId(request);
  const profileId = request.nextUrl.searchParams.get("profileId");

  if (!profileId) {
    return jsonError("Debes indicar profileId", 422);
  }

  const profile = profiles.find(
    (item) => item.id === profileId && item.familyId === familyId,
  );

  if (!profile) {
    return jsonError("Perfil no encontrado", 404);
  }

  return NextResponse.json({ data: getRecommendations(profile) });
}
