// pages/[username].tsx
import { useRouter } from 'next/router';
import { useState } from 'react';

const defaultLinks = [
  { label: 'YouTube', url: 'https://youtube.com', color: '#FF0000' },
  { label: 'Instagram', url: 'https://instagram.com', color: '#E1306C' },
  { label: 'TikTok', url: 'https://tiktok.com', color: '#000000' },
  { label: 'Twitter', url: 'https://twitter.com', color: '#1DA1F2' },
  { label: 'Website', url: 'https://example.com', color: '#4C9AFF' },
];

export default function BioPage() {
  const router = useRouter();
  const { username } = router.query;

  const cleanUsername = Array.isArray(username) ? username[0] : username;
  const displayName = cleanUsername
    ? cleanUsername.charAt(0).toUpperCase() + cleanUsername.slice(1)
    : 'User';

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 px-6 py-16 font-sans">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${cleanUsername}`}
            alt={displayName}
            className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg"
          />
          <h1 className="text-3xl font-bold text-gray-800">{displayName}</h1>
          <p className="text-gray-600 mt-2">This is my bio link. Check out my links below!</p>
        </div>

        <div className="space-y-4">
          {defaultLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-white rounded-xl shadow hover:shadow-md transition-all duration-200 transform hover:scale-[1.02] text-center text-lg font-medium text-gray-800 hover:text-white"
              style={{ backgroundColor: link.color }}
            >
              {link.label}
            </a>
          ))}
        </div>

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
