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
      // ✅ Validate required fields
      if (!parsedUser.name || !parsedUser.username || !parsedUser.email) {
        throw new Error('Invalid user data');
      }
      setUser(parsedUser);
    } catch (error) {
      console.error('Failed to parse user data', error);
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
    return <p style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Loading...</p>;
  }

  if (!user) {
    return <p style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>Session expired. Please log in again.</p>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: 'white' }}>
      {/* Header */}
      <header style={{ padding: '20px', borderBottom: '1px solid #333' }}>
        <h1 style={{ fontSize: '24px' }}>Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            float: 'right',
            padding: '8px 16px',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </header>

      {/* Main */}
      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
        <h2>Welcome, {user.name || 'User'}!</h2>
        <p>Username: @{user.username}</p>
        <p>Email: {user.email}</p>
      </main>
    </div>
  );
}
