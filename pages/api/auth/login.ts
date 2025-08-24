// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db'; // ✅ Default import
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    await dbConnect();

    // ✅ Case-insensitive email lookup
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ Use the comparePassword method (bcrypt)
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!, // Must be set in Render
      { expiresIn: '7d' }
    );

    // ✅ Return success
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error: any) {
    console.error('Login error:', error);

    // Handle JWT secret missing
    if (error.message.includes('secretOrPrivateKey must have a value')) {
      return res.status(500).json({ message: 'JWT_SECRET is not set. Check environment variables.' });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
}
