// pages/dashboard.tsx
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { PublicUser } from "../components/ProfileView";

const ProfileView = dynamic(() => import("../components/ProfileView"), { ssr: false });

type Link = { label: string; url: string; color?: string };
type User = PublicUser & { _id: string; email: string };

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (!token || !savedUser) {
      window.location.href = "/login";
      return;
    }
    try {
      const parsed = JSON.parse(savedUser);
      if (!Array.isArray(parsed.links)) parsed.links = [];
      setUser(parsed);
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  }, []);

  const updateField = (name: keyof User, value: any) => {
    setUser((u) => (u ? { ...u, [name]: value } : u));
  };

  const updateLink = (i: number, field: keyof Link, value: string) => {
    if (!user) return;
    const links = [...user.links];
    links[i] = { ...links[i], [field]: value };
    updateField("links", links);
  };

  const addLink = () => {
    if (!user) return;
    updateField("links", [...user.links, { label: "", url: "", color: "#1f2937" }]);
  };

  const removeLink = (i: number) => {
    if (!user) return;
    updateField(
      "links",
      user.links.filter((_, idx) => idx !== i)
    );
  };

  const previewUser = useMemo<PublicUser | null>(() => {
    if (!user) return null;
    return {
      name: user.name,
      username: user.username,
      bio: user.bio,
      avatar: user.avatar,
      banner: user.banner,
      links: user.links || [],
      theme: user.theme || "card",
    };
  }, [user]);

  const save = async () => {
    if (!user || !user._id) return;
    setSaving(true);
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: user.name,
          username: user.username,
          bio: user.bio,
          avatar: user.avatar,
          banner: user.banner,
          links: user.links,
          theme: user.theme || "card",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setEditing(false);
    } catch (e: any) {
      alert(e.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="space-x-2">
          {!editing ? (
            <button onClick={() => setEditing(true)} className="px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500">
              Edit Profile
            </button>
          ) : (
            <>
              <button onClick={save} disabled={saving} className="px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50">
                {saving ? "Saving…" : "Save Changes"}
              </button>
              <button onClick={() => setEditing(false)} className="px-3 py-2 rounded-md bg-gray-600 hover:bg-gray-500">
                Cancel
              </button>
            </>
          )}
          <button onClick={logout} className="px-3 py-2 rounded-md bg-red-600 hover:bg-red-500">
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Preview */}
        <section>
          <h2 className="text-sm text-gray-400 mb-2">Preview</h2>
          <div className="rounded-xl overflow-hidden border border-neutral-800">
            {previewUser && <ProfileView user={previewUser} fullHeight={false} />}
          </div>
        </section>

        {/* Form */}
        <section className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Name</label>
            <input
              className="w-full rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2"
              value={user.name || ""}
              onChange={(e) => updateField("name", e.target.value)}
              disabled={!editing}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Bio</label>
            <textarea
              className="w-full rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2"
              rows={3}
              value={user.bio || ""}
              onChange={(e) => updateField("bio", e.target.value)}
              disabled={!editing}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Avatar URL</label>
              <input
                className="w-full rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2"
                value={user.avatar || ""}
                onChange={(e) => updateField("avatar", e.target.value)}
                disabled={!editing}
                placeholder="https://…/avatar.jpg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Banner URL</label>
              <input
                className="w-full rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2"
                value={user.banner || ""}
                onChange={(e) => updateField("banner", e.target.value)}
                disabled={!editing}
                placeholder="https://…/banner.jpg"
              />
            </div>
          </div>

          {/* Theme */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Theme</label>
            <div className="flex gap-3">
              {(["card", "minimal", "gradient"] as const).map((t) => (
                <label key={t} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    disabled={!editing}
                    checked={(user.theme || "card") === t}
                    onChange={() => updateField("theme", t)}
                  />
                  <span className="capitalize">{t}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-400">Links</label>
              {editing && (
                <button onClick={addLink} className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-sm">
                  + Add
                </button>
              )}
            </div>

            <div className="space-y-2">
              {(user.links || []).map((l, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-2">
                  <input
                    className="md:col-span-3 rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2"
                    placeholder="Label"
                    value={l.label || ""}
                    onChange={(e) => updateLink(i, "label", e.target.value)}
                    disabled={!editing}
                  />
                  <input
                    className="md:col-span-7 rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2"
                    placeholder="https://your.link"
                    value={l.url || ""}
                    onChange={(e) => updateLink(i, "url", e.target.value)}
                    disabled={!editing}
                  />
                  <div className="md:col-span-2 flex gap-2">
                    <input
                      type="color"
                      className="w-full rounded-md bg-neutral-900 border border-neutral-800"
                      value={l.color || "#1f2937"}
                      onChange={(e) => updateLink(i, "color", e.target.value)}
                      disabled={!editing}
                    />
                    {editing && (
                      <button
                        onClick={() => removeLink(i)}
                        className="px-3 rounded-md bg-red-600 hover:bg-red-500"
                        title="Remove"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
