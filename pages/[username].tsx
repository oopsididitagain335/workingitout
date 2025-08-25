// pages/[username].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Link = {
  label: string;
  url: string;
  color: string;
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
        // ✅ Ensure links is array
        if (!data.user?.links || !Array.isArray(data.user.links)) {
          data.user = {
            ...data.user,
            links: [],
          };
        }
        if (data.user.links.length === 0) {
          data.user.links = [
            { label: 'YouTube', url: 'https://youtube.com', color: '#FF0000' },
            { label: 'Instagram', url: 'https://instagram.com', color: '#E1306C' },
            { label: 'TikTok', url: 'https://tiktok.com', color: '#000000' },
            { label: 'Twitter', url: 'https://twitter.com', color: '#1DA1F2' },
            { label: 'Website', url: 'https://example.com', color: '#4C9AFF' },
          ];
        }
        setUser(data.user);
      })
      .catch(() => {
        // ✅ Fallback: Only show if user exists in DB
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-400">Profile not found</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${user.banner || '/default-banner.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="min-h-screen bg-black bg-opacity-70">
        <div className="max-w-md mx-auto pt-24 px-6 pb-12 text-center">
          {/* Avatar */}
          <img
            src={user.avatar}
            alt={user.name}
            className="w-28 h-28 rounded-full mx-auto border-4 border-white shadow-2xl object-cover"
            onError={(e) => {
              e.currentTarget.src = '/default-avatar.png'; // ✅ Fallback to a real image
            }}
          />

          {/* Name & Bio */}
          <h1 className="text-3xl font-bold text-white mb-2 mt-6">{user.name}</h1>
          <p className="text-gray-300 mb-8 text-sm max-w-xs mx-auto leading-relaxed">{user.bio}</p>

          {/* Links */}
          <div className="space-y-4">
            {(user.links || []).map(
              (link, i) =>
                link?.url && (
                  <a
                    key={i}
                    href={link.url.trim().startsWith('http') ? link.url.trim() : `https://${link.url.trim()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-4 px-6 bg-opacity-90 hover:bg-opacity-100 text-white font-semibold text-lg rounded-xl shadow transition-all duration-200 transform hover:scale-105"
                    style={{
                      backgroundColor: link.color || '#111827',
                    }}
                  >
                    {link.label}
                  </a>
                )
            )}
          </div>

          {/* Footer */}
          <p className="text-gray-400 text-xs mt-12">
            Powered by{' '}
            <a href="https://thebiolink.lol" className="text-green-400 hover:underline">
              thebiolink.lol
            </a>
          </p>
        </div>
      </div>

      {/* Embedded CSS */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        html,
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow-x: hidden;
        }
        .max-w-md {
          max-width: 400px;
        }
        .rounded-full {
          border-radius: 50%;
        }
        .shadow-2xl {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }
        .object-cover {
          object-fit: cover;
        }
        .bg-opacity-70 {
          background-opacity: 0.7;
        }
        .hover:scale-105 {
          transform: scale(1.05);
        }
        .transition-all {
          transition: all 0.2s ease;
        }
      `}</style>
    </div>
  );
}
