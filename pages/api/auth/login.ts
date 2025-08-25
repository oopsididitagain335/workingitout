// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db';
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
    // ✅ Connect to DB
    await dbConnect();

    // ✅ Find user (case-insensitive)
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ Validate JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET is not set');
      return res.status(500).json({ message: 'Authentication error: JWT secret missing' });
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // ✅ Return success
    res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
      },
      token,
    });
  } catch (error: any) {
    console.error('🔐 Login API error:', error);

    if (error.message.includes('secretOrPrivateKey must have a value')) {
      return res.status(500).json({ message: 'JWT_SECRET is not set in environment' });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(500).json({ message: 'Invalid JWT configuration' });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
}
