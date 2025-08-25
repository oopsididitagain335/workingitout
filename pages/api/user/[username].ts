// pages/api/user/[username].ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db";
import User from "../../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const raw = req.query.username;
  const username = typeof raw === "string" ? raw.toLowerCase() : "";

  if (!username) return res.status(400).json({ user: null });

  const user = await User.findOne({ username }).select("-password -email");
  if (!user) return res.status(404).json({ user: null });

  // (Optional) count a view — super lightweight; you can guard with IP/bot filters later
  try {
    await User.updateOne({ _id: user._id }, { $inc: { views: 1 } });
  } catch (_) {}

  res.status(200).json({
    user: {
      name: user.name,
      username: user.username,
      bio: user.bio,
      avatar: user.avatar,
      banner: user.banner,
      links: Array.isArray(user.links) ? user.links : [],
      theme: user.theme || "card",
      views: user.views ?? 0,
    },
  });
}
