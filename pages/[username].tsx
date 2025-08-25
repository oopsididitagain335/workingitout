// pages/[username].tsx
import { GetServerSideProps } from "next";
import dbConnect from "../lib/db";
import UserModel from "../models/User";

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
  error?: string;
}

export default function Profile({ user }: ProfileProps) {
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500">User Not Found</h1>
          <p className="text-gray-400 mt-2">This profile doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-12 text-center relative">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10">
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-green-500 shadow-2xl mx-auto mb-6">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name || user.username}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-4xl font-bold text-white">
              {user.username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {user.name || user.username}
        </h1>

        {user.bio && (
          <p className="text-gray-300 max-w-sm mx-auto mb-8 leading-relaxed">
            {user.bio}
          </p>
        )}

        <div className="w-full max-w-xs md:max-w-md space-y-3">
          {user.links && user.links.length > 0 ? (
            user.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-3.5 px-6 rounded-xl font-semibold shadow-lg transform transition hover:scale-105 active:scale-95 text-white truncate"
                style={{ backgroundColor: link.color }}
              >
                {link.label}
              </a>
            ))
          ) : (
            <p className="text-gray-500 py-4">No links yet.</p>
          )}
        </div>

        <div className="mt-12 text-gray-600 text-sm">
          Powered by{" "}
          <a href="/" className="text-green-400 hover:underline">thebiolink</a>
        </div>
      </div>
    </div>
  );
}

// ✅ Real server-side fetch — no mocks
export const getServerSideProps: GetServerSideProps<ProfileProps> = async (context) => {
  const { username } = context.params as { username: string };

  await dbConnect();

  try {
    const userDoc = await UserModel.findOne({ username }).lean<UserType>().exec();

    if (!userDoc) {
      return { props: { user: null } };
    }

    return {
      props: {
        user: {
          username: userDoc.username,
          name: userDoc.name || "",
          bio: userDoc.bio || "",
          avatar: userDoc.avatar || "",
          links: Array.isArray(userDoc.links) ? userDoc.links : [],
        },
      },
    };
  } catch (err) {
    console.error("DB Error:", err);
    return { props: { user: null } };
  }
};
