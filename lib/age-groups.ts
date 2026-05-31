import { AgeRange } from "@/types/domain";

export function getAgeRange(age: number): AgeRange {
  if (age <= 2) return "0-2";
  if (age <= 5) return "3-5";
  return "6-8";
}

export function validateAge(age: number): boolean {
  return Number.isInteger(age) && age >= 0 && age <= 8;
}
