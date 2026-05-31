import { getFamilyId, jsonError } from "@/lib/api-helpers";
import { subscriptions } from "@/lib/in-memory-store";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const subscriptionSchema = z.object({
  plan: z.enum(["free", "plus", "premium"]),
});

const planLimits = {
  free: 10,
  plus: 60,
  premium: 250,
};

export async function GET(request: NextRequest) {
  const familyId = getFamilyId(request);
  const subscription = subscriptions.find((item) => item.familyId === familyId);

  if (!subscription) {
    return jsonError("Suscripción no encontrada", 404);
  }

  return NextResponse.json({ data: subscription });
}

export async function POST(request: NextRequest) {
  const familyId = getFamilyId(request);
  const parsed = subscriptionSchema.safeParse(await request.json());

  if (!parsed.success) {
    return jsonError("Plan inválido", 422);
  }

  const existing = subscriptions.find((item) => item.familyId === familyId);

  if (existing) {
    existing.plan = parsed.data.plan;
    existing.monthlyLimit = planLimits[parsed.data.plan];
    existing.active = true;
    existing.renewalDate = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 30,
    ).toISOString();

    return NextResponse.json({ data: existing });
  }

  const newSubscription = {
    familyId,
    plan: parsed.data.plan,
    active: true,
    renewalDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    storiesGeneratedThisMonth: 0,
    monthlyLimit: planLimits[parsed.data.plan],
  };

  subscriptions.push(newSubscription);

  return NextResponse.json({ data: newSubscription }, { status: 201 });
}
