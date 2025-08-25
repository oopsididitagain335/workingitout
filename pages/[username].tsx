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
  views?: number;
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
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="bg-black/50 rounded-2xl p-8 w-full max-w-md text-center shadow-lg">
          {/* Avatar */}
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/default-avatar.png";
                }}
              />
            ) : (
              <svg
                className="w-12 h-12 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.7-9.8 4.9v2.4h19.6v-2.4c0-3.2-6.5-4.9-9.8-4.9z" />
              </svg>
            )}
          </div>

          {/* Name */}
          <h1 className="text-2xl font-bold text-white mt-4">{user.name}</h1>

          {/* Bio */}
          {user.bio && (
            <p className="text-gray-300 text-sm mt-2 leading-relaxed">
              {user.bio}
            </p>
          )}

          {/* Links (optional) */}
          {user.links.length > 0 && (
            <div className="mt-6 space-y-3">
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
                      className="block py-3 px-4 rounded-lg text-white font-medium transition transform hover:scale-[1.02]"
                      style={{
                        backgroundColor: link.color || "#1f2937",
                      }}
                    >
                      {link.label}
                    </a>
                  )
              )}
            </div>
          )}

          {/* Views (optional) */}
          {user.views !== undefined && (
            <div className="mt-6 text-gray-400 text-sm flex items-center justify-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              {user.views}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
