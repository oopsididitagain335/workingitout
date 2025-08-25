// components/ProfileView.tsx
import React from "react";

export type Link = { label: string; url: string; color?: string };
export type PublicUser = {
  name: string;
  username: string;
  bio?: string;
  avatar?: string;
  banner?: string;
  links: Link[];
  theme?: "card" | "minimal" | "gradient";
  views?: number;
};

type Props = {
  user: PublicUser;
  fullHeight?: boolean; // true on public page, false in small preview
};

const safeUrl = (url: string) => {
  const t = url.trim();
  if (!t) return "";
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
};

export default function ProfileView({ user, fullHeight = true }: Props) {
  const bgImage = user.banner || "/default-banner.jpg";
  const hasLinks = Array.isArray(user.links) && user.links.length > 0;

  const Base = (
    <div className="relative w-full">
      {/* overlay variants */}
      {user.theme === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
      )}
      {(user.theme === "card" || !user.theme) && (
        <div className="absolute inset-0 bg-black/40" />
      )}

      <div
        className={`relative z-10 flex items-center justify-center ${
          fullHeight ? "min-h-screen" : "min-h-[320px]"
        } px-6`}
      >
        <div
          className={
            user.theme === "minimal"
              ? "text-center max-w-xl w-full"
              : "bg-black/50 backdrop-blur-sm rounded-2xl p-8 text-center max-w-md w-full shadow-lg"
          }
        >
          {/* Avatar */}
          <div
            className={`mx-auto overflow-hidden rounded-full ${
              user.theme === "minimal" ? "w-20 h-20" : "w-24 h-24"
            } bg-gray-700 flex items-center justify-center`}
          >
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar}
                alt={user.name || user.username}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/default-avatar.png";
                }}
              />
            ) : (
              <svg className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.418 0-10 2.239-10 5v3h20v-3c0-2.761-5.582-5-10-5Z" />
              </svg>
            )}
          </div>

          {/* Name */}
          <h1
            className={`mt-4 font-bold text-white ${
              user.theme === "minimal" ? "text-2xl" : "text-2xl"
            }`}
          >
            {user.name || user.username}
          </h1>

          {/* Bio */}
          {user.bio && (
            <p className="text-gray-300 text-sm mt-2 leading-relaxed">
              {user.bio}
            </p>
          )}

          {/* Links */}
          {hasLinks && (
            <div className={`mt-6 ${user.theme === "minimal" ? "space-y-3" : "space-y-3"}`}>
              {user.links.map((link, i) => {
                if (!link?.url) return null;
                const href = safeUrl(link.url);
                return (
                  <a
                    key={`${link.label}-${i}`}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-3 px-4 rounded-xl text-white font-medium transition transform hover:scale-[1.02] hover:shadow"
                    style={{ backgroundColor: link.color || "#1f2937" }}
                  >
                    {link.label || href}
                  </a>
                );
              })}
            </div>
          )}

          {/* Views (optional) */}
          {typeof user.views === "number" && (
            <div className="mt-6 text-gray-400 text-xs flex items-center justify-center gap-1">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" strokeWidth={2} />
              </svg>
              {user.views}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`bg-cover bg-center ${fullHeight ? "min-h-screen" : ""}`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {user.theme === "minimal" ? (
        // Minimal keeps the raw background
        <div className="bg-black/30">{Base}</div>
      ) : (
        Base
      )}
    </div>
  );
}
