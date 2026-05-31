import { Schema, model, models } from "mongoose";

const ReadingProgressSchema = new Schema(
  {
    profileId: { type: String, required: true, index: true },
    storyId: { type: String, required: true, index: true },
    minutesRead: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    lastReadAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const ReadingProgressModel =
  models.ReadingProgress ?? model("ReadingProgress", ReadingProgressSchema);
