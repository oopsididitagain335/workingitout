// pages/[username].tsx
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

// Mock data for demo (replace with real DB fetch in production)
const mockUser = {
  username: "johndoe",
  name: "John Doe",
  bio: "Full-stack developer • Open-source lover • Building the future one line at a time.",
  avatar: "",
  links: [
    { label: "GitHub", url: "https://github.com/johndoe", color: "#3b82f6" },
    { label: "Twitter", url: "https://twitter.com/johndoe", color: "#1da1f2" },
    { label: "Portfolio", url: "https://johndoe.dev", color: "#10b981" },
    { label: "Email Me", url: "mailto:hello@johndoe.dev", color: "#6366f1" },
  ],
};

export default function Profile() {
  const router = useRouter();
  const { username } = router.query;

  // In real app: fetch from API or SSR via getServerSideProps
  // For demo: use mock data if username matches
  const user = username === "johndoe" ? mockUser : null;

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">🫥 Not Found</h1>
          <p className="text-gray-400 mt-2">This profile doesn’t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-12 text-center relative overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Avatar */}
      <div className="relative z-10 w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-green-500 shadow-2xl mb-6">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center text-4xl font-bold text-white">
            {user.username.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Name */}
      <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
        {user.name || user.username}
      </h1>

      {/* Bio */}
      {user.bio && (
        <p className="max-w-sm md:max-w-md text-gray-300 text-sm md:text-base leading-relaxed mb-8 px-2">
          {user.bio}
        </p>
      )}

      {/* Links */}
      <div className="w-full max-w-xs md:max-w-md space-y-3 z-10">
        {user.links && user.links.length > 0 ? (
          user.links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3.5 px-6 rounded-xl font-semibold shadow-lg transform transition-all hover:scale-105 hover:shadow-xl active:scale-95 text-white truncate"
              style={{ backgroundColor: link.color }}
            >
              {link.label}
            </a>
          ))
        ) : (
          <p className="text-gray-500 italic py-4">No links yet.</p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 text-gray-700 text-xs">
        Powered by{" "}
        <span className="text-green-500 font-semibold">thebiolink</span>
      </div>
    </div>
  );
}

// Optional: Replace with real DB fetch
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.params as { username: string };

  // Here you'd connect to DB and find user
  // await dbConnect()
  // const user = await UserModel.findOne({ username })

  // For now, just pass username to client
  return {
    props: {},
  };
};
