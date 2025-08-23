// lib/dbConnect.ts
import mongoose from 'mongoose';

// Extend global with proper caching structure
declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Use a global variable to cache the connection
const globalWithMongoose = global as typeof global & {
  mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  // If already connected, return the cached connection
  if (cached.conn) {
    return cached.conn;
  }

  // If connection promise doesn't exist, create it
  if (!cached.promise) {
    const opts = { bufferCommands: false };

    cached.promise = mongoose.connect(process.env.MONGO_URI!, opts);
  }

  // Wait for the promise to resolve
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    // Reset on error
    cached.promise = null;
    console.error('MongoDB connection error:', e);
    throw e;
  }

  // Return the connection
  return cached.conn;
}

export default dbConnect;
