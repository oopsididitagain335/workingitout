import React, { useState } from 'react';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate submission
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail('');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-80 -right-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Logo / Brand */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 mb-6 drop-shadow-sm"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          thebiolink.lol
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed">
          One link to rule them all. <br />
          Coming soon — and it’s going to be <strong className="text-purple-600">legendary</strong>.
        </p>

        {/* Email Capture Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mb-10"
        >
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 w-full transition-all duration-300 ease-in-out"
            aria-label="Email address"
          />
          <button
            className={`px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform ${
              submitted ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={submitted}
          >
            {submitted ? '✓ Notified!' : 'Notify Me'}
          </button>
        </form>

        {/* Helper Text */}
        <p className="text-sm text-gray-600">
          Be the first to launch your <em className="text-indigo-600">perfect</em> bio link.
        </p>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-auto pt-12 pb-6 text-center text-gray-600 text-sm">
        Made with 💖 for creators, influencers, and internet legends. <br />
        &copy; {new Date().getFullYear()} thebiolink.lol — All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;

// Add custom animations via style tag or external CSS (optional in JSX)
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
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
`}</style>
