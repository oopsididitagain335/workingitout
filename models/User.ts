// models/User.ts
import { Schema, model, models, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

// 🔗 Link Interface
export interface Link {
  label: string;
  url: string;
  color: string;
}

// 🧍 User Interface
export interface User extends Document {
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

// 📐 Schema Definition
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
    maxlength: 200,
  },
  avatar: {
    type: String,
    default: '',
  },
  banner: {
    type: String,
    default: '', // e.g., background/cover image URL
  },
  theme: {
    type: String,
    enum: ['card', 'minimal', 'gradient'],
    default: 'card',
  },
  links: [
    {
      label: { type: String, default: '' },
      url: { type: String, default: '' },
      color: { type: String, default: '#10b981' }, // Emerald green
    },
  ],
}, {
  timestamps: true,
});
