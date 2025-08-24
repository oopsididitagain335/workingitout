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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6 py-16 font-sans">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo & Headline */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              thebiolink.
            </span>
            <span className="text-gray-600">lol</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            One link to rule them all. Share your links, socials, and content with a beautiful, fast, and modern bio page.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
          <input
            type="text"
            placeholder="yourname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && goToLink()}
            className="px-6 py-4 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-200 shadow-sm transition w-full sm:w-72 text-center sm:text-left"
          />
          <button
            onClick={goToLink}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition duration-200 transform hover:scale-105"
          >
            Go →
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md text-left hover:shadow-lg transition">
            <h3 className="font-bold text-gray-800 text-lg">⚡ Instant Setup</h3>
            <p className="text-gray-600 mt-1">No signup needed — just type your name and go.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-left hover:shadow-lg transition">
            <h3 className="font-bold text-gray-800 text-lg">🎨 Fully Customizable</h3>
            <p className="text-gray-600 mt-1">Log in to design your profile, links, and avatar.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-left hover:shadow-lg transition">
            <h3 className="font-bold text-gray-800 text-lg">📱 Mobile-Optimized</h3>
            <p className="text-gray-600 mt-1">Looks perfect on any device — phone, tablet, or desktop.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-left hover:shadow-lg transition">
            <h3 className="font-bold text-gray-800 text-lg">🔒 No Tracking, No Ads</h3>
            <p className="text-gray-600 mt-1">We respect your privacy. No cookies, no ads, no spam.</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/login"
            className="inline-block bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-full font-medium shadow transition transform hover:scale-105"
          >
            Log In
          </a>
          <a
            href="/signup"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-medium shadow transition transform hover:scale-105"
          >
            Sign Up Free
          </a>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-sm text-gray-500">
          <p>© 2025 thebiolink.lol — One link. Infinite possibilities.</p>
        </footer>
      </div>
    </div>
  );
}
