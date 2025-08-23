// pages/api/auth/me.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers.cookie?.split(';')
    .find(c => c.trim().startsWith('authToken='));

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = token.split('_')[1];

  try {
    await dbConnect();
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
