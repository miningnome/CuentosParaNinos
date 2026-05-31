import { Schema, model, models } from "mongoose";

const StorySchema = new Schema(
  {
    profileId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    ageRange: { type: String, enum: ["0-2", "3-5", "6-8"], required: true },
    theme: { type: String, required: true },
    content: { type: String, required: true },
    voiceNarrationUrl: { type: String },
    illustrationUrl: { type: String },
  },
  { timestamps: true },
);

export const StoryModel = models.Story ?? model("Story", StorySchema);
