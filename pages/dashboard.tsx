// pages/dashboard.tsx
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [links, setLinks] = useState<{ label: string; url: string; color: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load user data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/me");
        if (!res.ok) throw new Error("Failed to load profile");
        const data = await res.json();
        setName(data.name || "");
        setBio(data.bio || "");
        setAvatar(data.avatar || "");
        setLinks(data.links || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const addLink = () => {
    setLinks([...links, { label: "", url: "", color: "#10b981" }]);
  };

  const updateLink = (i: number, field: "label" | "url" | "color", value: string) => {
    const updated = [...links];
    updated[i][field] = value;
    setLinks(updated);
  };

  const removeLink = (i: number) => {
    setLinks(links.filter((_, index) => index !== i));
  };

  const saveProfile = async () => {
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio, avatar, links }),
      });

      if (!res.ok) throw new Error("Failed to save");

      alert("Profile updated!");
    } catch (err: any) {
      setError("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            thebiolink
          </h1>
          <p className="text-gray-400 mt-2">Edit your bio link page</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-900 text-red-100 rounded text-sm">{error}</div>}

        <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl space-y-5 border border-gray-800">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-500 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
            <textarea
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-500 focus:outline-none"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Avatar URL</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-500 focus:outline-none"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Links</h2>
              <button
                onClick={addLink}
                className="flex items-center gap-1 bg-green-600 hover:bg-green-500 px-3 py-1 rounded-full text-sm"
              >
                ➕ Add
              </button>
            </div>

            {links.length === 0 ? (
              <p className="text-gray-500 text-center py-4 bg-gray-800 rounded">No links yet.</p>
            ) : (
              <div className="space-y-3">
                {links.map((link, i) => (
                  <div key={i} className="grid grid-cols-4 gap-2 items-center p-3 bg-gray-800 rounded">
                    <input
                      type="text"
                      placeholder="Label"
                      className="col-span-1 p-2 rounded bg-gray-700"
                      value={link.label}
                      onChange={(e) => updateLink(i, "label", e.target.value)}
                    />
                    <input
                      type="url"
                      placeholder="https://"
                      className="col-span-2 p-2 rounded bg-gray-700"
                      value={link.url}
                      onChange={(e) => updateLink(i, "url", e.target.value)}
                    />
                    <div className="flex gap-2">
                      <input
                        type="color"
                        className="w-8 h-8 rounded"
                        value={link.color}
                        onChange={(e) => updateLink(i, "color", e.target.value)}
                      />
                      <button
                        onClick={() => removeLink(i)}
                        className="text-red-400 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={saveProfile}
            disabled={saving}
            className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 disabled:opacity-70"
          >
            {saving ? "Saving..." : "💾 Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
