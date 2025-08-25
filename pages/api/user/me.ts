import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/db';
import UserModel from '../../models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]'; // ✅ Correct relative path

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 🔐 Get session using NextAuth
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized: Login required' });
  }

  try {
    // 🛢️ Connect to database
    await dbConnect();

    // 🔍 Find user by email (from session)
    const user = await UserModel.findOne({
      email: session.user.email,
    }).select('name bio avatar banner theme links username'); // Add any fields you want to expose

    if (!user) {
      return res.status(404).json({ error: 'User not found in database' });
    }

    // ✅ Return user data (excluding sensitive fields like password)
    return res.status(200).json(user);
  } catch (error: any) {
    console.error('Error in /api/user/me:', error);

    return res.status(500).json({
      error: 'Internal server error. Could not retrieve user.',
      // Don't send `error.message` in production for security
    });
  }
}
