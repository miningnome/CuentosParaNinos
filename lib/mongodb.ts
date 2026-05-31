import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

const cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } =
  (globalThis as typeof globalThis & {
    mongooseCache?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
  }).mongooseCache ?? { conn: null, promise: null };

if (!(globalThis as typeof globalThis & { mongooseCache?: typeof cached }).mongooseCache) {
  (globalThis as typeof globalThis & { mongooseCache?: typeof cached }).mongooseCache = cached;
}

export const isMongoConfigured = Boolean(uri);

export async function connectToMongo() {
  if (!uri) {
    throw new Error("MONGODB_URI no está configurada");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB ?? "cuentos_para_ninos",
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
