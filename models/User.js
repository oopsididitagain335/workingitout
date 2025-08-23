// models/User.js
import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  name: { type: String, default: '' },
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

export default mongoose.models.User || model('User', UserSchema);
