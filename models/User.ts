// models/User.ts
import { Schema, model, models, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define your Link interface
export interface Link {
  label: string;
  url: string;
  color: string;
}

// Define User interface WITHOUT extending Document
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
  comparePassword(candidate: string): Promise<boolean>;
}

// Define the schema
const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: 'This is my bio link. Check out my links below!',
  },
  avatar: {
    type: String,
    default: '',
  },
  links: [
    {
      label: { type: String, default: '' },
      url: { type: String, default: '' },
      color: { type: String, default: '#10b981' },
    },
  ],
}, {
  timestamps: true,
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Add password comparison method
UserSchema.methods.comparePassword = async function (
  candidate: string
): Promise<boolean> {
  return await bcrypt.compare(candidate, this.password);
};

// Prevent model overwrite (e.g. during hot reload)
const UserModel = models.User || model<User>('User', UserSchema);

export default UserModel;
