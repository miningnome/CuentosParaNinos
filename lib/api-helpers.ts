import { NextRequest, NextResponse } from "next/server";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function getFamilyId(request: NextRequest) {
  return request.headers.get("x-family-id") ?? "family-demo";
}

export function assertAdmin(request: NextRequest) {
  const key = request.headers.get("x-admin-key");
  const expected = process.env.ADMIN_PANEL_KEY ?? "dev-admin-key";

  return key === expected;
}
