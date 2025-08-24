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
  links: Link[];
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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
      if (!parsedUser._id || !parsedUser.email) {
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

  const handleEditToggle = () => {
    if (!editing && !user) return;
    setEditing(!editing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (!user) return;
    setUser({ ...user, [name]: value });
  };

  const handleLinkChange = (index: number, field: 'label' | 'url' | 'color', value: string) => {
    if (!user) return;
    const newLinks = [...user.links];
    newLinks[index][field] = value;
    setUser({ ...user, links: newLinks });
  };

  const addLink = () => {
    if (!user) return;
    const newLink = { label: '', url: '', color: '#10b981' };
    setUser({ ...user, links: [...user.links, newLink] });
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

  if (loading) {
    return (
      <div className="container">
        <p className="loading">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container">
        <p className="error">Session expired. Please log in again.</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1 className="title">Your Dashboard</h1>
        <div className="header-buttons">
          {!editing ? (
            <button onClick={handleEditToggle} className="btn edit">
              Edit Profile
            </button>
          ) : (
            <>
              <button onClick={handleSave} className="btn save" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button onClick={handleEditToggle} className="btn cancel">
                Cancel
              </button>
            </>
          )}
          <button onClick={handleLogout} className="btn logout">
            Logout
          </button>
        </div>
      </header>

      {/* Main Form */}
      <main className="main">
        <div className="form-grid">
          <div className="form-group">
            <label className="label">Full Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!editing}
              className="input"
            />
          </div>

          <div className="form-group">
            <label className="label">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              disabled={!editing}
              className="input"
            />
          </div>

          <div className="form-group">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!editing}
              className="input"
            />
          </div>

          <div className="form-group">
            <label className="label">Avatar URL</label>
            <input
              type="url"
              name="avatar"
              value={user.avatar}
              onChange={handleChange}
              disabled={!editing}
              className="input"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <div className="form-group">
            <label className="label">Bio</label>
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleChange}
              disabled={!editing}
              className="textarea"
              rows={3}
            />
          </div>
        </div>

        {/* Links Section */}
        <div className="links-section">
          <h2 className="section-title">Your Links</h2>
          {user.links.map((link, index) => (
            <div key={index} className="link-item">
              <input
                type="text"
                placeholder="Label (e.g. Twitter)"
                value={link.label}
                onChange={(e) => handleLinkChange(index, 'label', e.target.value)}
                disabled={!editing}
                className="input link-label"
              />
              <input
                type="url"
                placeholder="https://..."
                value={link.url}
                onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                disabled={!editing}
                className="input link-url"
              />
              <input
                type="color"
                value={link.color}
                onChange={(e) => handleLinkChange(index, 'color', e.target.value)}
                disabled={!editing}
                className="color-picker"
              />
              {editing && user.links.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  className="btn remove-link"
                  disabled={saving}
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {editing && (
            <button onClick={addLink} className="btn add-link" disabled={saving}>
              + Add Link
            </button>
          )}
        </div>
      </main>

      {/* Embedded CSS */}
      <style jsx>{`
        .container {
          min-height: 100vh;
          background: #000;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .header {
          padding: 20px 30px;
          border-bottom: 1px solid #222;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #0a0a0a;
        }

        .title {
          font-size: 24px;
          font-weight: 600;
          color: white;
        }

        .header-buttons {
          display: flex;
          gap: 10px;
        }

        .btn {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .edit { background: #10b981; color: white; }
        .edit:hover { background: #0d946e; }

        .save { background: #1d4ed8; color: white; }
        .save:hover { background: #1e40af; }

        .cancel { background: #6b7280; color: white; }
        .cancel:hover { background: #4b5563; }

        .logout { background: #ef4444; color: white; }
        .logout:hover { background: #dc2626; }

        .remove-link { background: #374151; color: white; width: 30px; }
        .add-link { background: #374151; color: white; margin-top: 10px; }

        .main {
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
        }

        .form-grid {
          display: grid;
          gap: 20px;
          margin-bottom: 30px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .label {
          font-size: 14px;
          color: #aaa;
        }

        .input, .textarea {
          padding: 12px;
          background: #111;
          border: 1px solid #333;
          border-radius: 8px;
          color: white;
          font-size: 15px;
        }

        .input:focus, .textarea:focus {
          border-color: #10b981;
          outline: none;
        }

        .textarea {
          resize: vertical;
        }

        .links-section {
          margin-top: 20px;
        }

        .section-title {
          font-size: 18px;
          margin-bottom: 15px;
          color: #ddd;
        }

        .link-item {
          display: grid;
          grid-template-columns: 2fr 3fr 1fr 1fr;
          gap: 10px;
          margin-bottom: 10px;
        }

        .link-label { grid-column: span 1; }
        .link-url { grid-column: span 2; }

        .color-picker {
          height: 40px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        .loading, .error {
          text-align: center;
          padding: 40px;
          color: #ccc;
        }

        .error {
          color: #ef4444;
        }
      `}</style>
    </div>
  );
}
