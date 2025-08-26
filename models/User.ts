// models/User.ts
import { Schema, model, models, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

// Sub-document interface
export interface Link {
  label: string;
  url: string;
  color: string;
}

// Document interface with methods
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

// Define schema with correct typing
const LinkSchema = new Schema<Link>({
  label: { type: String, required: true },
  url: { type: String, required: true },
  color: { type: String, required: true },
});

// Fix: Explicitly type `this` in pre-save hook
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
  { timestamps: true }
);

// ✅ Fix: Correctly type `this` as IUser in pre-save
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// ✅ Fix: Correctly type `this` in method
UserSchema.methods.comparePassword = async function (
  this: IUser,
  candidate: string
): Promise<boolean> {
  return await bcrypt.compare(candidate, this.password);
};

// ✅ Fix: Proper model instantiation with type assertion
const UserModel = models.User ? (models.User as unknown as ReturnType<typeof model<IUser>>) : model<IUser>('User', UserSchema);

export default UserModel;
