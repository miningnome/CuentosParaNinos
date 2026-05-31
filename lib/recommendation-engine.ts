import { getAgeRange } from "@/lib/age-groups";
import { Recommendation } from "@/types/domain";

export function getRecommendations(profile: {
  id: string;
  age: number;
  interests: string[];
  readingMinutesToday: number;
  maxMinutesPerDay: number;
}): Recommendation[] {
  const ageRange = getAgeRange(profile.age);
  const firstInterest = profile.interests[0] ?? "descubrimiento";
  const remaining = Math.max(profile.maxMinutesPerDay - profile.readingMinutesToday, 0);

  return [
    {
      profileId: profile.id,
      reason: `Tema alineado con interés principal: ${firstInterest}.`,
      theme: firstInterest,
      suggestedAgeRange: ageRange,
    },
    {
      profileId: profile.id,
      reason:
        remaining > 0
          ? `Dispone de ${remaining} minutos para lectura hoy.`
          : "Ha alcanzado su límite diario recomendado.",
      theme: remaining > 0 ? "aventuras cortas" : "cuento breve para mañana",
      suggestedAgeRange: ageRange,
    },
  ];
}
