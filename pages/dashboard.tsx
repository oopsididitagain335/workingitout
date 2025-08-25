// pages/dashboard.tsx
import { useState } from "react";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [links, setLinks] = useState<{ label: string; url: string; color: string }[]>([]);

  const addLink = () => {
    setLinks([...links, { label: "", url: "", color: "#10b981" }]);
  };

  const updateLink = (i: number, field: string, value: string) => {
    const updated = [...links];
    (updated[i] as any)[field] = value;
    setLinks(updated);
  };

  const removeLink = (i: number) => {
    setLinks(links.filter((_, idx) => idx !== i));
  };

  const saveProfile = async () => {
    await fetch("/api/user/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, bio, avatar, links }),
    });
    alert("Profile updated!");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Profile Fields */}
      <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-2xl shadow-lg space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 rounded bg-gray-800 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Bio"
          className="w-full p-2 rounded bg-gray-800 outline-none"
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <input
          type="text"
          placeholder="Avatar URL"
          className="w-full p-2 rounded bg-gray-800 outline-none"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />

        {/* Links */}
        <h2 className="text-xl font-semibold mt-6">Links</h2>
        {links.map((link, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Label"
              className="p-2 rounded bg-gray-800 flex-1"
              value={link.label}
              onChange={(e) => updateLink(i, "label", e.target.value)}
            />
            <input
              type="text"
              placeholder="URL"
              className="p-2 rounded bg-gray-800 flex-1"
              value={link.url}
              onChange={(e) => updateLink(i, "url", e.target.value)}
            />
            <input
              type="color"
              className="w-10 h-10 rounded"
              value={link.color}
              onChange={(e) => updateLink(i, "color", e.target.value)}
            />
            <button
              onClick={() => removeLink(i)}
              className="bg-red-600 px-3 py-1 rounded"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={addLink}
          className="bg-green-600 px-4 py-2 rounded mt-3"
        >
          ➕ Add Link
        </button>

        <button
          onClick={saveProfile}
          className="w-full bg-indigo-600 py-3 mt-6 rounded-lg font-bold hover:bg-indigo-500"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}
