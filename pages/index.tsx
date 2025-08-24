// pages/index.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const goToLink = () => {
    if (username.trim()) {
      router.push(`/${username.trim().toLowerCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* Navbar */}
      <nav className="px-6 py-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center gap-2">
          <svg
            className="w-8 h-8 text-green-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="text-xl font-bold">thebiolink.lol</span>
        </div>
        <div className="flex gap-4">
          <a
            href="/login"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Log In
          </a>
          <a
            href="/signup"
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white font-medium transition"
          >
            Sign Up
          </a>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 py-16">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Your digital identity,
          <br />
          <span className="text-green-500">simplified.</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl leading-relaxed">
          Create stunning bio links, showcase your content, and connect with your
          audience. <br />
          thebiolink.lol gives you the tools to build your online presence —
          beautifully.
        </p>

        {/* Username Input */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20 w-full max-w-lg">
          <input
            type="text"
            placeholder="yourname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && goToLink()}
            className="px-6 py-4 text-lg border border-gray-700 bg-gray-900 rounded-full focus:outline-none focus:ring-4 focus:ring-green-500 shadow-sm transition w-full sm:w-72 text-center sm:text-left"
          />
          <button
            onClick={goToLink}
            className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition duration-200 transform hover:scale-105"
          >
            Claim →
          </button>
        </div>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-8 max-w-5xl w-full mb-16">
          {[
            {
              title: 'Instant Setup',
              text: 'No signup needed. Just claim your name and go.',
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              ),
            },
            {
              title: 'Fully Customizable',
              text: 'Design your profile, links, and avatar with ease.',
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V7.414A2 2 0 0018 5.414V4a2 2 0 00-2-2H8a2 2 0 00-2 2v1.414A2 2 0 006 7.414V16a2 2 0 002 2h.01M8 13v3m4-3v3m4-3v3"
                />
              ),
            },
            {
              title: 'No Tracking',
              text: 'We respect your privacy. No ads, no cookies, no spam.',
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              ),
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-gray-900 p-6 rounded-xl border border-gray-800 text-left hover:border-green-500/50 transition"
            >
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {f.icon}
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.text}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/login"
            className="inline-block bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-full font-medium shadow transition"
          >
            Log In
          </a>
          <a
            href="/signup"
            className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-medium shadow transition"
          >
            Sign Up Free
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-800">
        <p>© 2025 thebiolink.lol — One link. Infinite possibilities.</p>
      </footer>
    </div>
  );
}
