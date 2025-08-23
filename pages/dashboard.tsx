// pages/dashboard.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Link {
  label: string;
  url: string;
  color: string;
}

interface User {
  _id: string;
  username: string;
  name: string;
  bio: string;
  avatar: string;
  links: Link[];
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/auth/me');
      if (!res.ok) return router.push('/login');
      const data = await res.json();
      setUser(data.user);
      setLoading(false);
    };
    fetchUser();
  }, [router]);

  const handleLinkChange = (index: number, field: keyof Link, value: string) => {
    const newLinks = [...(user?.links || [])];
    newLinks[index][field] = value;
    setUser({ ...user!, links: newLinks });
  };

  const addLink = () => {
    setUser({
      ...user!,
      links: [...user!.links, { label: '', url: '', color: '#000000' }],
    });
  };

  const removeLink = (index: number) => {
    const newLinks = user!.links.filter((_, i) => i !== index);
    setUser({ ...user!, links: newLinks });
  };

  const saveChanges = async () => {
    setError('');
    const res = await fetch(`/api/user/${user?.username}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      alert('Saved!');
    } else {
      setError('Failed to save');
    }
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Your Bio Link</h1>
        <p className="text-gray-600 mb-8">Manage your links and profile</p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={user?.name || ''}
                onChange={(e) => setUser({ ...user!, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Bio</label>
              <input
                type="text"
                value={user?.bio || ''}
                onChange={(e) => setUser({ ...user!, bio: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Avatar URL (optional)</label>
              <input
                type="url"
                value={user?.avatar || ''}
                onChange={(e) => setUser({ ...user!, avatar: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Links</h2>
          {user?.links.map((link, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-3 mb-4 p-4 border rounded-lg">
              <input
                type="text"
                placeholder="Label (e.g. YouTube)"
                value={link.label}
                onChange={(e) => handleLinkChange(i, 'label', e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <input
                type="url"
                placeholder="https://..."
                value={link.url}
                onChange={(e) => handleLinkChange(i, 'url', e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <input
                type="color"
                value={link.color}
                onChange={(e) => handleLinkChange(i, 'color', e.target.value)}
                className="w-12 h-10 border rounded cursor-pointer"
              />
              <button
                onClick={() => removeLink(i)}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addLink}
            className="w-full py-2 text-blue-600 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition"
          >
            + Add Link
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={saveChanges}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
          <a
            href={`/${user?.username}`}
            target="_blank"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Preview
          </a>
        </div>

        <p className="text-center text-gray-500 mt-8">
          <button
            onClick={() => {
              fetch('/api/auth/logout', { method: 'POST' });
              router.push('/');
            }}
            className="text-red-600 hover:underline"
          >
            Log Out
          </button>
        </p>
      </div>
    </div>
  );
}
