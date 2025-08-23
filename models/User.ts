// models/User.ts
import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

// TypeScript interfaces
export interface Link {
  label: string;
  url: string;
  color: string;
}

export interface User {
  _id: Types.ObjectId;
  username: string;
  name: string;
  email: string;
  password: string;
  bio: string;
  avatar: string;
  links: Link[];
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  name: { type: String, default: '' },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  bio: { type: String, default: 'This is my bio link. Check out my links below!' },
  avatar: { type: String, default: '' },
  links: [
    {
      label: String,
      url: String,
      color: String,
    },
  ],
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  return await bcrypt.compare(candidate, this.password);
};

// Export model
export default mongoose.models.User || model<User>('User', UserSchema);
