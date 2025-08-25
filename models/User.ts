// models/User.ts
import { Schema, model, models, Types } from 'mongoose';
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
  banner: string;
  theme: 'card' | 'minimal' | 'gradient';
  links: Link[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<User>({
  username: { type: String, required: true, unique: true, lowercase: true },
  name: { type: String, default: '' },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  bio: { 
    type: String, 
    default: 'This is my bio link. Check out my links below!' 
  },
  avatar: { type: String, default: '' },
  banner: { type: String, default: '' }, // background / cover image
  theme: { type: String, enum: ['card', 'minimal', 'gradient'], default: 'card' }, // profile style
  links: [
    {
      label: { type: String, default: '' },
      url: { type: String, default: '' },
      color: { type: String, default: '#10b981' }, // green
    },
  ],
}, {
  timestamps: true,
});

// Hash password before save if changed
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  return await bcrypt.compare(candidate, this.password);
};

const UserModel = models.User || model<User>('User', UserSchema);
export default UserModel;
