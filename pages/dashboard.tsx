// pages/dashboard.tsx
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [links, setLinks] = useState<{ label: string; url: string; color: string }[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Load saved data from localStorage (or backend later)
  useEffect(() => {
    const saved = localStorage.getItem("thebiolink-profile");
    if (saved) {
      const data = JSON.parse(saved);
      setName(data.name || "");
      setBio(data.bio || "");
      setAvatar(data.avatar || "");
      setLinks(data.links || []);
    }
  }, []);

  const addLink = () => {
    setLinks([...links, { label: "", url: "", color: "#10b981" }]);
  };

  const updateLink = (index: number, field: keyof { label: string; url: string; color: string }, value: string) => {
    const updated = [...links];
    updated[index][field] = value;
    setLinks(updated);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const saveProfile = async () => {
    const profileData = { name, bio, avatar, links };

    setIsSaving(true);
    setMessage("");

    // Simulate API call (replace with real API later)
    try {
      // Save to localStorage for now
      localStorage.setItem("thebiolink-profile", JSON.stringify(profileData));

      // Optional: send to backend
      // await fetch("/api/user/update", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(profileData),
      // });

      setMessage("✅ Profile saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("❌ Failed to save. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            thebiolink
          </h1>
          <p className="text-gray-400 mt-2">Customize your link-in-bio page</p>
        </div>

        {/* Status Message */}
        {message && (
          <div
            className={`p-3 text-sm rounded-lg text-center mb-6 ${
              message.includes("✅") ? "bg-green-900 text-green-200" : "bg-red-900 text-red-200"
            }`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl space-y-5 border border-gray-800">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-500 focus:outline-none transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
            <textarea
              placeholder="Tell people about yourself"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-500 focus:outline-none transition"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Avatar URL</label>
            <input
              type="text"
              placeholder="https://example.com/avatar.jpg"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-500 focus:outline-none transition"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>

          {/* Links Section */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-white">Your Links</h2>
              <button
                onClick={addLink}
                className="flex items-center gap-1 bg-green-600 hover:bg-green-500 px-3 py-1 rounded-full text-sm transition"
              >
                ➕ Add
              </button>
            </div>

            {links.length === 0 ? (
              <p className="text-gray-500 text-center py-4 bg-gray-800 rounded-lg">No links yet. Click “Add” to begin.</p>
            ) : (
              <div className="space-y-3">
                {links.map((link, i) => (
                  <div key={i} className="grid grid-cols-4 gap-2 items-center p-3 bg-gray-800 rounded-lg">
                    <input
                      type="text"
                      placeholder="Label"
                      className="col-span-1 p-2 rounded bg-gray-700 border border-gray-600"
                      value={link.label}
                      onChange={(e) => updateLink(i, "label", e.target.value)}
                    />
                    <input
                      type="url"
                      placeholder="https://"
                      className="col-span-2 p-2 rounded bg-gray-700 border border-gray-600"
                      value={link.url}
                      onChange={(e) => updateLink(i, "url", e.target.value)}
                    />
                    <div className="flex gap-2">
                      <input
                        type="color"
                        className="w-8 h-8 rounded cursor-pointer"
                        value={link.color}
                        onChange={(e) => updateLink(i, "color", e.target.value)}
                      />
                      <button
                        onClick={() => removeLink(i)}
                        className="text-red-400 hover:text-red-300 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Save Button */}
          <button
            onClick={saveProfile}
            disabled={isSaving}
            className={`w-full py-3 rounded-xl font-bold text-white transition transform hover:scale-[1.02] ${
              isSaving
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500"
            }`}
          >
            {isSaving ? "Saving..." : "💾 Save Profile"}
          </button>
        </div>

        <p className="text-center text-gray-600 text-sm mt-6">
          Your data is saved locally. <br />
          In production, this syncs with your account.
        </p>
      </div>
    </div>
  );
}
