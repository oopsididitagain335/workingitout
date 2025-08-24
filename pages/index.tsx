import React from 'react'; // ✅ Add this line
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const goToLink = () => {
    if (username.trim()) {
      router.push(`/preview/${username.trim().toLowerCase()}`);
    }
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logoArea">
          <div className="logoCircle">B</div>
          <span className="brand">thebiolink.lol</span>
        </div>
        <div className="navLinks">
          <a href="/login" className="login">Login</a>
          <a href="/signup" className="register">Register</a>
        </div>
      </nav>

      {/* Hero */}
      <main className="hero">
        <h1 className="heroTitle">
          Your digital identity,
          <br />
          <span className="highlight">simplified.</span>
        </h1>
        <p className="heroText">
          Create stunning bio links, showcase your content, and connect with your audience.
          <br />
          thebiolink.lol gives you the tools to build your online presence — beautifully.
        </p>

        {/* Claim box */}
        <div className="claimBox">
          <span className="prefix">thebiolink.lol/</span>
          <input
            type="text"
            placeholder="yourname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && goToLink()}
            aria-label="Username"
          />
          <button onClick={goToLink}>Claim</button>
        </div>

        {/* Features */}
        <section className="features">
          <div className="featureCard">
            <div className="icon">⚡</div>
            <h3>Instant Setup</h3>
            <p>No signup needed. Claim and go.</p>
          </div>
          <div className="featureCard">
            <div className="icon">🎨</div>
            <h3>Fully Customizable</h3>
            <p>Design your profile, links, and avatar with ease.</p>
          </div>
          <div className="featureCard">
            <div className="icon">🔒</div>
            <h3>No Tracking</h3>
            <p>We respect your privacy. No ads, no cookies, no spam.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 thebiolink.lol — One link. Infinite possibilities.</p>
      </footer>

      {/* CSS */}
      <style jsx>{`
        .container {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          background: #000;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
          width: 100vw;
          box-sizing: border-box;
        }

        /* === REST OF YOUR STYLES === */
        /* (Keep all your existing CSS here — no changes needed) */
        .navbar {
          padding: 20px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #1f1f1f;
          background: #000;
        }

        .logoArea {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logoCircle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #10b981;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
        }

        .brand {
          font-size: 16px;
          font-weight: 500;
        }

        .navLinks a {
          margin-left: 16px;
          font-size: 14px;
          text-decoration: none;
          transition: 0.2s ease;
        }

        .login {
          color: #aaa;
        }

        .register {
          background: #10b981;
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          font-weight: 500;
        }

        .hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 40px 20px;
        }

        .heroTitle {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .heroTitle span {
          color: #10b981;
        }

        .heroText {
          color: #ccc;
          font-size: 16px;
          max-width: 700px;
          margin-bottom: 50px;
          line-height: 1.6;
        }

        .claimBox {
          display: flex;
          align-items: center;
          background: #111;
          border: 1px solid #222;
          border-radius: 50px;
          overflow: hidden;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        }

        .prefix {
          padding: 0 15px;
          color: #777;
          font-size: 14px;
          background: #111;
        }

        .claimBox input {
          flex: 1;
          background: transparent;
          border: none;
          color: white;
          padding: 15px;
          font-size: 15px;
          outline: none;
        }

        .claimBox input::placeholder {
          color: #555;
        }

        .claimBox button {
          background: #10b981;
          color: white;
          border: none;
          padding: 15px 25px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
          border-radius: 0 50px 50px 0;
        }

        .claimBox button:hover {
          background: #059669;
        }

        .claimBox button:focus {
          outline: none;
          box-shadow: none;
          -webkit-focus-ring-color: transparent;
          -webkit-appearance: none;
          appearance: none;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 1000px;
          margin-top: 60px;
          padding: 0 20px;
        }

        @media (max-width: 768px) {
          .features {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        .featureCard {
          background: #111;
     
