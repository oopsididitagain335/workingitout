// pages/api/user/[username].ts
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  const { username } = req.query;

  const user = await User.findOne({ username: username.toLowerCase() }).select('-password -email');
  if (!user) return res.status(404).json({ user: null });

  res.json({ user: JSON.parse(JSON.stringify(user)) });
}
