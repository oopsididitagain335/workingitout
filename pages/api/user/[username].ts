import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { username } = req.query;

  if (typeof username !== 'string') {
    return res.status(400).json({ error: 'Invalid username' });
  }

  const user = await User.findOne({ username: username.toLowerCase() }).select('-password -email');

  if (!user) {
    return res.status(404).json({ user: null });
  }

  res.status(200).json({ user: JSON.parse(JSON.stringify(user)) });
}
