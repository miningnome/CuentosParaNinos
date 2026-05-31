import { Schema, model, models } from "mongoose";

const SubscriptionSchema = new Schema(
  {
    familyId: { type: String, required: true, unique: true, index: true },
    plan: { type: String, enum: ["free", "plus", "premium"], default: "free" },
    active: { type: Boolean, default: true },
    renewalDate: { type: Date, required: true },
    storiesGeneratedThisMonth: { type: Number, default: 0 },
    monthlyLimit: { type: Number, default: 10 },
  },
  { timestamps: true },
);

export const SubscriptionModel =
  models.Subscription ?? model("Subscription", SubscriptionSchema);
