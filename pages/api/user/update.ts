// pages/api/user/update.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

const toHttp = (url: string) => {
  const t = String(url || "").trim();
  if (!t) return "";
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    await dbConnect();

    let { name, username, bio, avatar, banner, links, theme } = req.body;

    // sanitize / normalize
    name = String(name || "").trim().slice(0, 80);
    username = String(username || "").trim().toLowerCase().slice(0, 40);
    bio = String(bio || "").trim().slice(0, 280);
    avatar = String(avatar || "").trim();
    banner = String(banner || "").trim();
    theme = ["card", "minimal", "gradient"].includes(theme) ? theme : "card";

    if (!Array.isArray(links)) links = [];
    links = links
      .slice(0, 10)
      .map((l: any) => ({
        label: String(l?.label || "").trim().slice(0, 60),
        url: toHttp(String(l?.url || "")),
        color: /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(String(l?.color || ""))
          ? l.color
          : "#1f2937",
      }))
      .filter((l: any) => l.label && l.url);

    const updated = await User.findByIdAndUpdate(
      decoded.userId,
      { name, username, bio, avatar, banner, links, theme },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updated) return res.status(404).json({ message: "User not found" });

    // return public-safe
    const safeUser = {
      _id: updated._id,
      name: updated.name,
      username: updated.username,
      email: updated.email, // for dashboard only; public endpoint omits
      bio: updated.bio,
      avatar: updated.avatar,
      banner: updated.banner,
      links: updated.links,
      theme: updated.theme,
      views: updated.views,
    };

    res.status(200).json({ message: "Profile updated successfully", user: safeUser });
  } catch (error: any) {
    if (error?.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    console.error("Update error:", error);
    return res.status(500).json({ message: "Failed to update profile" });
  }
}
