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
      {/* Animated Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-16 left-1/3 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Logo / Brand */}
        <div className="mb-6">
          <h1
            className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-700 animate-pulse-slow"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            thebiolink.lol
          </h1>
        </div>

        {/* Tagline */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed opacity-0 animate-fade-in"
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          One link to rule them all. <br />
          Coming soon — and it’s going to be <strong className="text-purple-600">legendary</strong>.
        </p>

        {/* Email Capture Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8 opacity-0 animate-fade-in"
          style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
        >
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-transparent text-gray-700 placeholder-gray-500 transition-all duration-300 transform hover:scale-105 shadow-md"
            aria-label="Email address"
          />
          <button
            type="submit"
            className="px-6 py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 transform hover:scale-105 hover:from-pink-600 hover:to-indigo-700"
          >
            {submitted ? '✓ Notified!' : 'Notify Me'}
          </button>
        </form>

        {/* Helper Text */}
        <p
          className="text-sm text-gray-600 opacity-0 animate-fade-in"
          style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}
        >
          Be the first to launch your <em className="text-indigo-600">perfect</em> bio link.
        </p>
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 mt-auto pt-10 pb-6 text-center text-gray-500 text-xs sm:text-sm opacity-0 animate-fade-in"
        style={{ animationDelay: '2s', animationFillMode: 'forwards' }}
      >
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

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fade-in 0.8s ease-out forwards;
  }

  @keyframes pulse-slow {
    0%, 100% {
      opacity: 1;
      text-shadow: 0 0 10px rgba(147, 51, 234, 0.3);
    }
    50% {
      opacity: 0.8;
      text-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
    }
  }
  .animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
  }
`}</style>
