// pages/api/auth/signup.ts
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

  const { username, email, password, name } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await dbConnect();

    const existingUser = await User.findOne({
      $or: [{ email }, { username: username.toLowerCase() }],
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      username: username.toLowerCase(),
      email,
      password,
      name: name || username,
    });

    await user.save();

    const userObj = user.toObject();
    delete userObj.password;

    // Set auth cookie
    res.setHeader('Set-Cookie', `authToken=abc_${user._id}; Path=/; HttpOnly; Max-Age=3600; SameSite=Strict`);

    res.status(201).json({ user: userObj });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
