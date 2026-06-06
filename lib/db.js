import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

console.log('MONGODB URI START:', MONGODB_URI?.slice(0, 20));

if (!MONGODB_URI) {
  throw new Error('Please add MONGODB_URI in .env.local');
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}