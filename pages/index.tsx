// pages/index.tsx
import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');

  const goToLink = () => {
    if (username.trim()) {
      window.location.href = `/${username.trim().toLowerCase()}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans">
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
          Your <span className="text-blue-600">link in bio.</span>
          <br />
          <span className="text-4xl md:text-6xl">Done right.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            One link to rule them all. Share your links, socials, and content with a beautiful, fast, and modern bio page.
        </p>

        <div className="space-y-4 mb-16">
          <p className="text-lg text-gray-700">
            Create your link:
          </p>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="yourname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && goToLink()}
              className="px-5 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-lg"
            />
            <button
              onClick={goToLink}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-r-lg transition"
            >
              Go
            </button>
          </div>
          <p className="text-sm text-gray-500">
            (e.g. <strong>thebiolink.lol/yourname</strong>)
          </p>
        </div>

        <div className="border-t pt-10 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why thebiolink.lol?</h2>
          <ul className="text-gray-600 space-y-2 text-left md:text-center">
            <li>⚡ Instant setup — no signup</li>
            <li>🎨 Fully customizable (coming soon)</li>
            <li>📱 Mobile-optimized & fast</li>
            <li>🔒 No tracking, no ads</li>
            <li>🌐 Hosted globally via Render</li>
          </ul>
        </div>

        <div className="mt-8">
          <a
            href="/login"
            className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            Log In
          </a>{' '}
          <a
            href="/signup"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
