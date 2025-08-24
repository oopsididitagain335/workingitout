// pages/api/user/update.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/db'; // ✅ Uses your current db.ts
import User from '../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify JWT
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // Connect to DB
    await dbConnect();

    // Extract updated fields from request body
    const { name, username, email, bio, avatar, links } = req.body;

    // Find and update user by ID
    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { name, username, email, bio, avatar, links },
      { new: true, runValidators: true }
    ).select('-password'); // Don't return password

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update localStorage on frontend by returning updated user
    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error: any) {
    console.error('Update error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    res.status(500).json({ message: 'Failed to update profile' });
  }
}
