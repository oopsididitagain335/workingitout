// pages/api/user/update.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ✅ Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // ✅ Check for auth header
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // ✅ Connect to DB
    await dbConnect();

    // ✅ Verify JWT
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.userId;

    // ✅ Extract fields from body
    const { name, username, email, bio, avatar, links } = req.body;

    // ✅ Validate required fields
    if (!name || !username || !email) {
      return res.status(400).json({ message: 'Name, username, and email are required' });
    }

    // ✅ Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, username, email, bio, avatar, links },
      { new: true, runValidators: true }
    ).select('-password'); // Never return password

    // ✅ If user not found
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // ✅ Success
    return res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error: any) {
    console.error('Update error:', error);

    // ✅ Handle JWT errors
    if (error.name === 'JsonWebTokenError' || error.message.includes('invalid signature')) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // ✅ Handle JWT secret missing
    if (error.message.includes('secretOrPrivateKey must have a value')) {
      return res.status(500).json({ message: 'JWT_SECRET is not set' });
    }

    // ✅ Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    // ✅ Generic fallback
    return res.status(500).json({ message: 'Failed to update profile' });
  }
}
