// pages/[username].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function BioPage() {
  const router = useRouter();
  const { username } = router.query;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    fetch(`/api/user/${username}`)
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  const displayUser = user || {
    name: typeof username === 'string' ? username.charAt(0).toUpperCase() + username.slice(1) : 'User',
    bio: 'This is my bio link.',
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${username}`,
    links: [
      { label: 'YouTube', url: 'https://youtube.com', color: '#FF0000' },
      { label: 'Instagram', url: 'https://instagram.com', color: '#E1306C' },
      { label: 'TikTok', url: 'https://tiktok.com', color: '#000000' },
      { label: 'Twitter', url: 'https://twitter.com', color: '#1DA1F2' },
      { label: 'Website', url: 'https://example.com', color: '#4C9AFF' },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 px-6 py-16 font-sans">
      <div className="max-w-md mx-auto text-center">
        {/* Avatar + Name */}
        <img
          src={displayUser.avatar}
          alt={displayUser.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg"
        />
        <h1 className="text-3xl font-bold text-gray-800">{displayUser.name}</h1>
        <p className="text-gray-600 mt-2">{displayUser.bio}</p>

        {/* Links */}
        <div className="space-y-4 mt-8">
          {displayUser.links.map((link, i) =>
            link.url ? (
              <a
                key={i}
                href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-white rounded-xl shadow hover:shadow-md transition-all duration-200 transform hover:scale-[1.02] text-lg font-medium text-white"
                style={{ backgroundColor: link.color || '#000000' }}
              >
                {link.label}
              </a>
            ) : null
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-12">
          Powered by{' '}
          <a href="https://thebiolink.lol" className="text-blue-600 hover:underline">
            thebiolink.lol
          </a>
        </p>
      </div>
    </div>
  );
}
