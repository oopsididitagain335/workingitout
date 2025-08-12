import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail('');
    }
  };

  // Detect system dark mode preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ease-in-out ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-950 text-white'
          : 'bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 text-gray-800'
      } px-4 sm:px-6 lg:px-8 overflow-hidden`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-20 -left-20 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob ${
            isDarkMode ? 'bg-purple-700' : 'bg-pink-200'
          }`}
        ></div>
        <div
          className={`absolute top-80 -right-20 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000 ${
            isDarkMode ? 'bg-indigo-700' : 'bg-indigo-200'
          }`}
        ></div>
        <div
          className={`absolute bottom-20 left-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000 ${
            isDarkMode ? 'bg-pink-900' : 'bg-purple-200'
          }`}
        ></div>
      </div>

      {/* Toggle Dark Mode */}
      <button
        onClick={toggleDarkMode}
        className={`absolute top-6 right-6 p-2 rounded-full text-sm font-medium transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gray-700 text-yellow-200 hover:bg-gray-600'
            : 'bg-white text-gray-800 hover:bg-gray-100 shadow'
        }`}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      {/* Main Content */}
      <main className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <h1
          className={`text-5xl sm:text-6xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent mb-6 drop-shadow-sm ${
            isDarkMode
              ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400'
              : 'bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-800'
          }`}
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          thebiolink.lol
        </h1>

        <p
          className={`text-lg sm:text-xl md:text-2xl mb-10 leading-relaxed transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          One link to rule them all. <br />
          Coming soon — and it’s going to be{' '}
          <strong
            className={
              isDarkMode ? 'text-purple-400' : 'text-purple-600'
            }
          >
            legendary
          </strong>
          .
        </p>

        {/* Email Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mb-8"
        >
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`flex-1 px-5 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-4 ${
              isDarkMode
                ? 'bg-gray-800 border-gray-600 placeholder-gray-500 text-white focus:ring-purple-900'
                : 'bg-white border-gray-300 placeholder-gray-500 text-gray-700 focus:ring-purple-200'
            } shadow-sm`}
            aria-label="Email address"
          />
          <button
            type="submit"
            className={`px-6 py-3 font-medium rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              submitted
                ? 'opacity-60 cursor-not-allowed'
                : isDarkMode
                ? 'bg-gradient-to-r from-pink-600 to-purple-700 text-white hover:from-pink-700 hover:to-purple-800 focus:ring-purple-700'
                : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 focus:ring-purple-500'
            }`}
            disabled={submitted}
          >
            {submitted ? '✓ Notified!' : 'Notify Me'}
          </button>
        </form>

        <p
          className={`text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Be the first to launch your{' '}
          <em
            className={
              isDarkMode ? 'text-purple-400' : 'text-purple-600'
            }
          >
            perfect
          </em>{' '}
          bio link.
        </p>
      </main>

      {/* Footer */}
      <footer
        className={`relative z-10 mt-auto pt-12 pb-6 text-center text-sm transition-colors duration-300 ${
          isDarkMode ? 'text-gray-500' : 'text-gray-500'
        }`}
      >
        Made with 💖 for creators, influencers, and internet legends. <br />
        &copy; {new Date().getFullYear()} thebiolink.lol — All rights reserved.
      </footer>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
