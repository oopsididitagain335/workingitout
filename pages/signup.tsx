// pages/signup.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Fix: Add type to `e`
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push('/login');
    } else {
      setError(data.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Create Account</h1>
        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-300 text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="John Doe"
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-300 text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="yourname"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white py-3 rounded-lg font-semibold transition transform hover:scale-[1.02]"
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-green-400 hover:underline font-medium">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
