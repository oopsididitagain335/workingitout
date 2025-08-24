// pages/api/user/update.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '../../lib/db';     // ✅ Imports from db.ts (not dbconnect.ts)
import User from '../../models/User';           // ✅ Assumes User model exists
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
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    await connectToDB();

    const { name, username, email, bio, avatar, links } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { name, username, email, bio, avatar, links },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
}
