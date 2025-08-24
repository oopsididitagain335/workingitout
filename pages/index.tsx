import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState("");

  const goToLink = () => {
    if (username.trim()) {
      window.location.href = `/preview/${username.trim()}`;
    }
  };

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      {/* Navbar */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 32px",
          backgroundColor: "#000",
          borderBottom: "1px solid #111",
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
          <span
            style={{
              display: "inline-block",
              background: "green",
              color: "#fff",
              borderRadius: "50%",
              width: "28px",
              height: "28px",
              textAlign: "center",
              lineHeight: "28px",
              marginRight: "8px",
            }}
          >
            B
          </span>
          thebiolink.lol
        </h1>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            style={{
              background: "transparent",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Login
          </button>
          <button
            style={{
              background: "#00d26a",
              border: "none",
              borderRadius: "6px",
              padding: "6px 14px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Register
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "42px", fontWeight: "bold", marginBottom: "20px" }}>
          Your digital identity,
          <br /> simplified.
        </h2>
        <p style={{ fontSize: "16px", color: "#aaa", marginBottom: "28px" }}>
          Create stunning bio links, showcase your content, and connect with your audience. <br />
          thebiolink.lol gives you the tools to build your online presence — beautifully.
        </p>

        {/* Username Claim Box */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#111",
            borderRadius: "30px",
            padding: "6px",
            width: "420px",
            maxWidth: "100%",
          }}
        >
          <span style={{ padding: "0 8px", color: "#666", fontSize: "14px" }}>
            thebiolink.lol/
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="yourname"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: "14px",
            }}
          />
          <button
            onClick={goToLink}
            style={{
              background: "#00d26a",
              border: "none",
              borderRadius: "30px",
              padding: "10px 20px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Claim
          </button>
        </div>
      </main>
    </div>
  );
}
