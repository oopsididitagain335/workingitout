// models/User.ts
import { Schema, model, models, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define sub-document interface
export interface Link {
  label: string;
  url: string;
  color: string;
}

// Define the User document interface (extends Document from Mongoose)
export interface IUser extends Document {
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

const LinkSchema = new Schema<Link>({
  label: { type: String, required: true },
  url: { type: String, required: true },
  color: { type: String, required: true },
});

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    name: { type: String, default: '' },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    bio: { type: String, default: 'This is my bio link.' },
    avatar: { type: String, default: '' },
    banner: { type: String, default: '' },
    theme: { type: String, enum: ['card', 'minimal', 'gradient'], default: 'card' },
    links: [LinkSchema],
  },
  { timestamps: true } // Adds createdAt, updatedAt
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Add method to compare password
UserSchema.methods.comparePassword = async function (
  candidate: string
): Promise<boolean> {
  return await bcrypt.compare(candidate, this.password);
};

// Prevent overcompilation in development
const UserModel = (models.User as unknown as typeof model<IUser>) || model<IUser>('User', UserSchema);

export default UserModel;
