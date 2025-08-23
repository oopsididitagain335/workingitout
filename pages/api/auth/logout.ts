// pages/api/auth/logout.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', 'authToken=; Path=/; Max-Age=0; HttpOnly');
  res.json({ message: 'Logged out' });
}
