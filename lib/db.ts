// lib/db.ts
import mongoose from 'mongoose';

// Extend the global scope to persist connection in development
declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const cached = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = { bufferCommands: false };

    // 🔴 Use MONGODB_URI (not MONGO_URI) to be consistent with common practice
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('Please define the MONGODB_URI environment variable');
    }

    cached.promise = mongoose.connect(uri, opts);
  }

  try {
    cached.conn = await cached.promise;
    console.log('✅ MongoDB connected successfully');
  } catch (e) {
    console.error('❌ MongoDB connection error:', e);
    cached.promise = null;
    throw new Error('Failed to connect to MongoDB');
  }

  return cached.conn;
}

export default dbConnect;
