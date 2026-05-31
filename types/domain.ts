export type AgeRange = "0-2" | "3-5" | "6-8";

export interface ChildProfile {
  id: string;
  familyId: string;
  name: string;
  age: number;
  interests: string[];
  readingMinutesToday: number;
  maxMinutesPerDay: number;
  contentFilters: string[];
}

export interface Story {
  id: string;
  profileId: string;
  title: string;
  ageRange: AgeRange;
  theme: string;
  content: string;
  voiceNarrationUrl?: string;
  illustrationUrl?: string;
  createdAt: string;
}

export interface ReadingProgress {
  id: string;
  profileId: string;
  storyId: string;
  minutesRead: number;
  completed: boolean;
  lastReadAt: string;
}

export interface Subscription {
  familyId: string;
  plan: "free" | "plus" | "premium";
  active: boolean;
  renewalDate: string;
  storiesGeneratedThisMonth: number;
  monthlyLimit: number;
}

export interface Recommendation {
  profileId: string;
  reason: string;
  theme: string;
  suggestedAgeRange: AgeRange;
}

export interface AdminMetrics {
  totalFamilies: number;
  totalProfiles: number;
  storiesGenerated: number;
  activeSubscriptions: number;
  averageReadingMinutes: number;
}
