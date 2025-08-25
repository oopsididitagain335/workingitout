import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/db";
import UserModel from "../../models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  if (req.method !== "POST") return res.status(405).end();

  const { name, bio, avatar, links } = req.body;

  await dbConnect();

  await UserModel.updateOne(
    { email: session.user.email },
    { $set: { name, bio, avatar, links } },
    { upsert: true }
  );

  res.status(200).json({ message: "Updated" });
}
