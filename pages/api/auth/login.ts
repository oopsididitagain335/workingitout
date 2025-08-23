// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    await dbConnect();
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userObj = user.toObject();
    delete userObj.password;

    res.setHeader('Set-Cookie', `authToken=abc_${user._id}; Path=/; HttpOnly; Max-Age=3600; SameSite=Strict`);

    res.json({ user: userObj });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
