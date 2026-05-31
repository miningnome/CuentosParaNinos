import { Schema, model, models } from "mongoose";

const ProfileSchema = new Schema(
  {
    familyId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 0, max: 8 },
    interests: { type: [String], default: [] },
    readingMinutesToday: { type: Number, default: 0 },
    maxMinutesPerDay: { type: Number, default: 30 },
    contentFilters: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const ProfileModel = models.Profile ?? model("Profile", ProfileSchema);
