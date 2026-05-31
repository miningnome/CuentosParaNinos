import { getAgeRange } from "@/lib/age-groups";
import { Story } from "@/types/domain";

interface GenerateStoryInput {
  profileId: string;
  age: number;
  theme: string;
  childName: string;
  interests: string[];
}

export function generateStoryWithAI(input: GenerateStoryInput): Story {
  const ageRange = getAgeRange(input.age);
  const id = `story-${crypto.randomUUID()}`;
  const hero = input.childName;
  const interestText = input.interests.slice(0, 2).join(" y ") || "imaginación";

  return {
    id,
    profileId: input.profileId,
    title: `${hero} y la aventura de ${input.theme}`,
    ageRange,
    theme: input.theme,
    content: `${hero} emprendió una historia sobre ${input.theme}. Durante el camino aprendió sobre ${interestText} con mensajes positivos, lenguaje seguro y final feliz adaptado a ${ageRange}.`,
    voiceNarrationUrl: `/audio/${id}.mp3`,
    illustrationUrl: `/illustrations/${id}.png`,
    createdAt: new Date().toISOString(),
  };
}
