// pages/dashboard.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// ✅ Define the User type
type User = {
  name: string;
  username: string;
  email: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null); // ✅ Typed state
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (!token || !savedUser) {
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);
      // ✅ Optional: validate required fields
      if (!parsedUser.name || !parsedUser.username || !parsedUser.email) {
        throw new Error('Invalid user data');
      }
      setUser(parsedUser);
    } catch (error) {
      console.error('Failed to parse or validate user data', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-red-500">Session expired. Please log in again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Welcome, {user.name || 'User'}!</h2>
          <p className="text-gray-400 mb-4">
            Username: <span className="text-green-400">@{user.username}</span>
          </p>
          <p className="text-gray-400">Email: {user.email}</p>

          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-300">
              🔐 This is your private dashboard. You're securely logged in.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
