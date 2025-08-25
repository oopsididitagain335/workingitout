// pages/dashboard.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type User = {
  name: string;
  username: string;
  email: string;
  bio: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
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
      if (!parsedUser.name || !parsedUser.username || !parsedUser.email) {
        throw new Error('Invalid user data');
      }
      setUser(parsedUser);
    } catch (error) {
      console.error('Failed to parse user data', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    }
  }, [router]);

  const handleEditToggle = () => {
    if (!editing && !user) return;
    setEditing(!editing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (!user) return;
    setUser({ ...user, [name]: value });
  };

  const handleSave = async () => {
    if (!user || !user._id) return;

    setSaving(true);
    try {
      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(user));
        setEditing(false);
      } else {
        const data = await res.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) {
    return <p style={{ color: 'red', textAlign: 'center' }}>Session expired. Please log in again.</p>;
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Welcome, {user.name}!</h2>
          {!editing && (
            <button
              onClick={handleEditToggle}
              style={{
                padding: '8px 16px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Edit Profile
            </button>
          )}
        </div>

        {editing ? (
          <div style={{ display: 'grid', gap: '20px' }}>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#222',
                  border: '1px solid #333',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '15px',
                }}
              />
            </div>

            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#222',
                  border: '1px solid #333',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '15px',
                }}
              />
            </div>

            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#222',
                  border: '1px solid #333',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '15px',
                }}
              />
            </div>

            <div>
              <label>Bio</label>
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
                rows={4}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#222',
                  border: '1px solid #333',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '15px',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  padding: '10px 20px',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={handleEditToggle}
                style={{
                  padding: '10px 20px',
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '10px' }}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Username:</strong> @{user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Bio:</strong> {user.bio}</p>
          </div>
        )}
      </main>
    </div>
  );
}
