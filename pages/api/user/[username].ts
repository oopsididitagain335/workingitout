// pages/api/user/[username].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query;

  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = req.headers.cookie?.split(';').find(c => c.trim().startsWith('authToken='));
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  const userId = token.split('_')[1];

  try {
    await dbConnect();
    const user = await User.findById(userId);

    if (!user || user.username !== username) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    Object.assign(user, req.body);
    await user.save();

    res.json({ message: 'Updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}
