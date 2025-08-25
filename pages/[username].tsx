// pages/[username].tsx
import { GetServerSideProps } from "next";
import dbConnect from "../lib/db";
import User from "../models/User";

interface Link {
  label: string;
  url: string;
  color: string;
}

interface ProfileProps {
  user: {
    username: string;
    name: string;
    bio: string;
    avatar: string;
    links: Link[];
  } | null;
}

export default function Profile({ user }: ProfileProps) {
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center text-white bg-black">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Avatar */}
      <div className="mt-16">
        <img
          src={user.avatar || "/default-avatar.png"}
          alt={user.username}
          className="w-32 h-32 rounded-full border-4 border-indigo-600 shadow-lg object-cover"
        />
      </div>

      {/* Info */}
      <div className="mt-6 text-center px-4 max-w-xl">
        <h1 className="text-2xl font-bold">{user.name || user.username}</h1>
        <p className="text-gray-400">@{user.username}</p>
        <p className="mt-3 text-lg">{user.bio}</p>
      </div>

      {/* Links */}
      <div className="mt-6 w-full max-w-md flex flex-col gap-3 px-4">
        {user.links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-3 rounded-lg font-semibold shadow-md"
            style={{ backgroundColor: link.color }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  await dbConnect();
  const user = await User.findOne({ username: params?.username }).lean();

  return {
    props: {
      user: user
        ? {
            username: user.username,
            name: user.name,
            bio: user.bio,
            avatar: user.avatar,
            links: user.links || [],
          }
        : null,
    },
  };
};
