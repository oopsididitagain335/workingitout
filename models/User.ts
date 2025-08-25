// models/User.ts
import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface Link {
  label: string;
  url: string;
  color: string;
}

export interface User {
  username: string;
  name: string;
  email: string;
  password: string;
  bio: string;
  avatar: string;
  banner: string;
  theme: 'card' | 'minimal' | 'gradient';
  links: Link[];
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  name: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: 'This is my bio link.' },
  avatar: { type: String, default: '' },
  banner: { type: String, default: '' },
  theme: { type: String, enum: ['card', 'minimal', 'gradient'], default: 'card' },
  links: [{ label: String, url: String, color: String }],
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function (candidate: string) {
  return await bcrypt.compare(candidate, this.password);
};

const UserModel = models.User || model<User>('User', UserSchema);
export default UserModel;
