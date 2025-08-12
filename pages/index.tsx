import React from 'react'

const HomePage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute top-80 -right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <main className="relative z-10 text-center max-w-3xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-6 drop-shadow-sm">
          Coming Soon
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed">
          We're putting the final touches on something amazing. 
          <br />
          Stay tuned — great things are on the way!
        </p>

        {/* Email Signup Form (Optional Touch) */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 w-full"
            aria-label="Email address"
          />
          <button
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
          >
            Notify Me
          </button>
        </div>

        {/* Footer Text */}
        <p className="mt-8 text-sm text-gray-500">
          We'll let you know when we launch. No spam, we promise.
        </p>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-auto pt-12 pb-6 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  )
}

export default HomePage
