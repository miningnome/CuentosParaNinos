import {
  ChildProfile,
  ReadingProgress,
  Story,
  Subscription,
} from "@/types/domain";

const now = new Date().toISOString();

export const profiles: ChildProfile[] = [
  {
    id: "profile-1",
    familyId: "family-demo",
    name: "Luna",
    age: 4,
    interests: ["animales", "amistad"],
    readingMinutesToday: 12,
    maxMinutesPerDay: 30,
    contentFilters: ["violencia"],
  },
  {
    id: "profile-2",
    familyId: "family-demo",
    name: "Mateo",
    age: 7,
    interests: ["espacio", "aventuras"],
    readingMinutesToday: 18,
    maxMinutesPerDay: 40,
    contentFilters: ["miedo"],
  },
];

export const stories: Story[] = [
  {
    id: "story-1",
    profileId: "profile-1",
    title: "La Conejita y el Bosque Musical",
    ageRange: "3-5",
    theme: "amistad",
    content:
      "Lía la conejita descubrió un bosque donde cada árbol sonaba como un instrumento.",
    voiceNarrationUrl: "/audio/demo-cuento-1.mp3",
    illustrationUrl: "/illustrations/bosque-musical.png",
    createdAt: now,
  },
];

export const readingProgress: ReadingProgress[] = [
  {
    id: "progress-1",
    profileId: "profile-1",
    storyId: "story-1",
    minutesRead: 8,
    completed: false,
    lastReadAt: now,
  },
];

export const subscriptions: Subscription[] = [
  {
    familyId: "family-demo",
    plan: "plus",
    active: true,
    renewalDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 25).toISOString(),
    storiesGeneratedThisMonth: 6,
    monthlyLimit: 60,
  },
];
