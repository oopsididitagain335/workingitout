// pages/[username].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ProfileView = dynamic(() => import("../components/ProfileView"), { ssr: false });
import type { PublicUser } from "../components/ProfileView";

export default function PublicProfile() {
  const { query } = useRouter();
  const username = (query.username as string) || "";
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;
    fetch(`/api/user/${encodeURIComponent(username)}`)
      .then((r) => r.json())
      .then((d) => setUser(d.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400 animate-pulse">Loading profile…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-400">Profile not found</p>
      </div>
    );
  }

  return <ProfileView user={user} fullHeight />;
}
