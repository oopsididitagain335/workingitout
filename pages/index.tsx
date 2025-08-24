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
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
      {/* Navbar */}
      <nav className="px-8 py-5 flex justify-between items-center border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-green-400 to-green-600 w-7 h-7 rounded-full flex items-center justify-center">
            <span className="text-black font-extrabold text-sm">S</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">thebiolink.lol</span>
        </div>
        <div className="flex gap-3">
          <a
            href="/login"
            className="px-4 py-1.5 rounded-md text-sm font-medium text-gray-300 hover:text-white transition"
          >
            Login
          </a>
          <a
            href="/signup"
            className="px-4 py-1.5 rounded-md bg-green-500 hover:bg-green-600 text-sm font-semibold text-black transition"
          >
            Register
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Your digital identity,
          <br />
          <span className="text-white">simplified.</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-12 leading-relaxed">
          Create stunning bio links, showcase your content, and connect with your audience.
          thebiolink.lol gives you the tools to build your online presence — beautifully.
        </p>

        {/* Username Claim */}
        <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-full overflow-hidden shadow-lg w-full max-w-lg">
          <span className="px-4 text-gray-400">thebiolink.lol/</span>
          <input
            type="text"
            placeholder="yourname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && goToLink()}
            className="flex-1 bg-transparent focus:outline-none text-white placeholder-gray-500"
          />
          <button
            onClick={goToLink}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold transition"
          >
            Claim
          </button>
        </div>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-6 max-w-5xl w-full mt-20">
          <div className="p-6 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-green-500/50 transition text-left">
            <h3 className="text-lg font-bold mb-2">⚡ Instant Setup</h3>
            <p className="text-gray-400 text-sm">No signup needed. Just claim your name and go.</p>
          </div>
          <div className="p-6 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-green-500/50 transition text-left">
            <h3 className="text-lg font-bold mb-2">🎨 Fully Customizable</h3>
            <p className="text-gray-400 text-sm">Design your profile, links, and avatar with ease.</p>
          </div>
          <div className="p-6 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-green-500/50 transition text-left">
            <h3 className="text-lg font-bold mb-2">🔒 No Tracking</h3>
            <p className="text-gray-400 text-sm">We respect your privacy. No ads, no cookies, no spam.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-xs border-t border-neutral-800">
        <p>© 2025 thebiolink.lol — One link. Infinite possibilities.</p>
      </footer>
    </div>
  );
}
