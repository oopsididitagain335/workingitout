// pages/dashboard.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Link = {
  label: string;
  url: string;
  color: string;
};

type User = {
  _id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  avatar: string;
  banner: string;
  links: Link[];
  theme: 'card' | 'minimal' | 'gradient';
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
      if (!parsedUser._id || !parsedUser.username) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (!user) return;
    setUser({ ...user, [name]: value });
  };

  const handleLinkChange = (index: number, field: keyof Link, value: string) => {
    if (!user) return;
    const newLinks = [...user.links];
    newLinks[index][field] = value;
    setUser({ ...user, links: newLinks });
  };

  const addLink = () => {
    if (!user) return;
    setUser({
      ...user,
      links: [...user.links, { label: '', url: '', color: '#10b981' }],
    });
  };

  const removeLink = (index: number) => {
    if (!user || user.links.length <= 1) return;
    const newLinks = user.links.filter((_, i) => i !== index);
    setUser({ ...user, links: newLinks });
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

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setEditing(false);
      } else {
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
    return (
      <div style={{ textAlign: 'center', color: 'white', marginTop: '50px' }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: 'white' }}>
      {/* Header */}
      <header style={{
        padding: '20px 30px',
        borderBottom: '1px solid #222',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 600 }}>Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
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
      <main style={{
        maxWidth: '900px',
        margin: '40px auto',
        padding: '20px',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '30px',
      }}>
        {/* Left: Avatar & Banner Preview */}
        <div>
          <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Preview</h2>
          <div style={{
            position: 'relative',
            width: '300px',
            height: '180px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '2px solid #333',
          }}>
            <div
              style={{
                backgroundImage: `url(${user.banner || '/default-banner.jpg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%',
              }}
            />
            <img
              src={user.avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=User'}
              alt="Profile"
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '20px',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '3px solid white',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              }}
            />
          </div>
        </div>

        {/* Right: Edit Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!editing}
              style={{
                width: '100%',
                padding: '10px',
                background: '#111',
                border: '1px solid #333',
                borderRadius: '6px',
                color: 'white',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>Bio</label>
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleChange}
              disabled={!editing}
              rows={3}
              style={{
                width: '100%',
                padding: '10px',
                background: '#111',
                border: '1px solid #333',
                borderRadius: '6px',
                color: 'white',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>Profile Picture URL</label>
            <input
              type="url"
              name="avatar"
              value={user.avatar}
              onChange={handleChange}
              disabled={!editing}
              placeholder="https://example.com/avatar.jpg"
              style={{
                width: '100%',
                padding: '10px',
                background: '#111',
                border: '1px solid #333',
                borderRadius: '6px',
                color: 'white',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>Banner URL</label>
            <input
              type="url"
              name="banner"
              value={user.banner}
              onChange={handleChange}
              disabled={!editing}
              placeholder="https://example.com/banner.jpg"
              style={{
                width: '100%',
                padding: '10px',
                background: '#111',
                border: '1px solid #333',
                borderRadius: '6px',
                color: 'white',
              }}
            />
          </div>

          {/* Links */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{ fontSize: '14px' }}>Links</label>
              {editing && (
                <button
                  type="button"
                  onClick={addLink}
                  disabled={saving}
                  style={{
                    fontSize: '12px',
                    padding: '4px 8px',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                  }}
                >
                  + Add
                </button>
              )}
            </div>

            {user.links.map((link, index) => (
              <div key={index} style={{ display: 'grid', gridTemplateColumns: '2fr 3fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <input
                  type="text"
                  placeholder="Label"
                  value={link.label}
                  onChange={(e) => handleLinkChange(index, 'label', e.target.value)}
                  disabled={!editing}
                  style={{
                    padding: '8px',
                    background: '#111',
                    border: '1px solid #333',
                    borderRadius: '6px',
                    color: 'white',
                  }}
                />
                <input
                  type="url"
                  placeholder="https://..."
                  value={link.url}
                  onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                  disabled={!editing}
                  style={{
                    padding: '8px',
                    background: '#111',
                    border: '1px solid #333',
                    borderRadius: '6px',
                    color: 'white',
                  }}
                />
                {editing && (
                  <input
                    type="color"
                    value={link.color}
                    onChange={(e) => handleLinkChange(index, 'color', e.target.value)}
                    disabled={!editing}
                    style={{ height: '40px', borderRadius: '6px' }}
                  />
                )}
                {editing && user.links.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLink(index)}
                    disabled={saving}
                    style={{
                      gridColumn: '4',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Save / Edit Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                style={{
                  padding: '10px 20px',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Edit Profile
              </button>
            ) : (
              <>
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
                  onClick={() => setEditing(false)}
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
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
