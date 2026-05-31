import { assertAdmin, jsonError } from "@/lib/api-helpers";
import { profiles, readingProgress, stories, subscriptions } from "@/lib/in-memory-store";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  if (!assertAdmin(request)) {
    return jsonError("No autorizado", 401);
  }

  const totalReadingMinutes = readingProgress.reduce(
    (total, progress) => total + progress.minutesRead,
    0,
  );

  return NextResponse.json({
    data: {
      totalFamilies: new Set(profiles.map((profile) => profile.familyId)).size,
      totalProfiles: profiles.length,
      storiesGenerated: stories.length,
      activeSubscriptions: subscriptions.filter((item) => item.active).length,
      averageReadingMinutes:
        readingProgress.length > 0
          ? Number((totalReadingMinutes / readingProgress.length).toFixed(2))
          : 0,
    },
  });
}
