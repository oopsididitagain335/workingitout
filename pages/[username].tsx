// pages/[username].tsx
import { GetServerSideProps } from "next";
import dbConnect from "../lib/db";
import UserModel from "../models/User";

// Define the shape of user props
interface Link {
  label: string;
  url: string;
  color: string;
}

interface UserType {
  username: string;
  name: string;
  bio: string;
  avatar: string;
  links: Link[];
}

interface ProfileProps {
  user: UserType | null;
}

export default function Profile({ user }: ProfileProps) {
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <h1 className="text-3xl font-bold">User not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col items-center px-6 py-12 text-center text-white">
      {/* Avatar */}
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-400 shadow-lg">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.username}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center text-4xl font-bold">
            {user.username.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Name + Bio */}
      <h1 className="mt-6 text-3xl font-extrabold">{user.name || user.username}</h1>
      <p className="mt-2 max-w-md text-gray-300">{user.bio}</p>

      {/* Links */}
      <div className="mt-8 w-full max-w-md flex flex-col gap-4">
        {user.links && user.links.length > 0 ? (
          user.links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 rounded-xl text-lg font-semibold shadow-md transform transition hover:scale-105"
              style={{ backgroundColor: link.color || "#10b981" }}
            >
              {link.label}
            </a>
          ))
        ) : (
          <p className="text-gray-500 italic">No links added yet.</p>
        )}
      </div>
    </div>
  );
}

// ✅ Server-side data fetch
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.params as { username: string };

  await dbConnect();

  const userDoc = await UserModel.findOne({ username }).lean();

  if (!userDoc) {
    return {
      props: { user: null },
    };
  }

  // Only return the safe fields
  const user: UserType = {
    username: userDoc.username,
    name: userDoc.name,
    bio: userDoc.bio,
    avatar: userDoc.avatar,
    links: userDoc.links || [],
  };

  return {
    props: { user },
  };
};
