// models/User.ts
import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

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

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  return await bcrypt.compare(candidate, this.password);
};

// ✅ Now TypeScript knows `mongoose.models` exists
const UserModel = mongoose.models.User || model<User>('User', UserSchema);
export default UserModel;
