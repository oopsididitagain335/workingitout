import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/db";
import UserModel from "../../models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]"; // if using auth

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  await dbConnect();
  const user = await UserModel.findOne({ email: session.user.email }).select("name bio avatar links");
  
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
}
