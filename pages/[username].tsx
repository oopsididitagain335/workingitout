// pages/[username].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Link = {
  label: string;
  url: string;
  color?: string;
};

type User = {
  name: string;
  bio: string;
  avatar: string;
  banner: string;
  links: Link[];
};

export default function BioPage() {
  const router = useRouter();
  const { username } = router.query;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    fetch(`/api/user/${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.user?.links || !Array.isArray(data.user.links)) {
          data.user.links = [];
        }
        setUser(data.user);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-400 text-lg font-medium">Profile not found</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${user.banner || "/default-banner.jpg"})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-lg mx-auto px-6 pt-24 pb-16 text-center">
        {/* Avatar */}
        <div className="w-32 h-32 mx-auto rounded-full border-4 border-white overflow-hidden shadow-xl">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt={user.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/default-avatar.png";
            }}
          />
        </div>

        {/* Name & Bio */}
        <h1 className="text-3xl font-bold text-white mt-6">{user.name}</h1>
        {user.bio && (
          <p className="text-gray-300 mt-2 text-sm leading-relaxed max-w-md mx-auto">
            {user.bio}
          </p>
        )}

        {/* Links */}
        {user.links.length > 0 && (
          <div className="mt-10 space-y-4">
            {user.links.map(
              (link, i) =>
                link?.url && (
                  <a
                    key={i}
                    href={
                      link.url.trim().startsWith("http")
                        ? link.url.trim()
                        : `https://${link.url.trim()}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-4 px-6 text-lg font-semibold rounded-xl shadow-md transform transition duration-200 hover:scale-[1.03] hover:shadow-lg"
                    style={{
                      backgroundColor: link.color || "#1f2937",
                      color: "#fff",
                    }}
                  >
                    {link.label}
                  </a>
                )
            )}
          </div>
        )}

        {/* Footer */}
        <p className="text-gray-500 text-xs mt-12">
          Powered by{" "}
          <a
            href="https://thebiolink.lol"
            className="text-green-400 hover:underline"
          >
            thebiolink.lol
          </a>
        </p>
      </div>
    </div>
  );
}
