import { useRouter } from "next/router";

export default function PreviewPage() {
  const router = useRouter();
  const { username } = router.query;

  if (!username) {
    return (
      <div
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#000",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "sans-serif",
        }}
      >
        <p style={{ fontSize: "18px", color: "#999" }}>Loading preview...</p>
      </div>
    );
  }

  // Generate realistic links dynamically using the username
  const links = [
    { label: "Instagram", url: `https://instagram.com/${username}`, color: "#D82D8B" },
    { label: "TikTok", url: `https://tiktok.com/@${username}`, color: "#000000" },
    { label: "YouTube", url: `https://youtube.com/@${username}`, color: "#FF0000" },
    { label: "X (Twitter)", url: `https://x.com/${username}`, color: "#1DA1F2" },
    { label: "Portfolio", url: `https://${username}.bio`, color: "#00B4AB" },
    { label: "Email", url: `mailto:hi@${username}.com`, color: "#6366F1" },
  ];

  // DiceBear avatar for visual consistency
  const avatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${username}`;

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Preview Mode Banner */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#ff1493",
          color: "white",
          textAlign: "center",
          padding: "10px 0",
          fontSize: "14px",
          fontWeight: "bold",
          position: "relative",
          zIndex: 10,
        }}
      >
        🔍 PREVIEW MODE • This is how @{username}’s page will appear live
      </div>

      {/* Main Preview Container - simulates the actual page */}
      <div
        style={{
          marginTop: "40px",
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#111",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(255, 20, 147, 0.2)",
          padding: "30px 20px",
          textAlign: "center",
        }}
      >
        {/* Avatar */}
        <img
          src={avatarUrl}
          alt="Profile"
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            border: "3px solid #fff",
            marginBottom: "16px",
          }}
        />

        {/* Username */}
        <h1
          style={{
            fontSize: "26px",
            fontWeight: "bold",
            margin: "0 0 8px 0",
            color: "#fff",
          }}
        >
          {username}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: "#aaa",
            fontSize: "15px",
            margin: "0 0 24px",
          }}
        >
          Just another awesome creator 🌟
        </p>

        {/* Links */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: link.color,
                color: "#fff",
                padding: "14px 20px",
                borderRadius: "12px",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "500",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Footer */}
        <p
          style={{
            marginTop: "30px",
            fontSize: "13px",
            color: "#777",
          }}
        >
          👋 Say hi • thebiolink.lol/{username}
        </p>
      </div>

      {/* Subtle hint below */}
      <p
        style={{
          marginTop: "20px",
          fontSize: "13px",
          color: "#555",
        }}
      >
        This is a live preview • Changes save automatically
      </p>
    </div>
  );
}
