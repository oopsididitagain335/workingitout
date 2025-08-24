import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const goToLink = () => {
    if (username.trim()) {
      // No actual profile creation, just preview
      router.push(`/preview/${username.trim().toLowerCase()}`);
    }
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logoArea">
          <div className="logoCircle">
            <span>B</span>
          </div>
          <span className="brand">thebiolink.lol</span>
        </div>
        <div className="navLinks">
          <a href="/login" className="login">
            Login
          </a>
          <a href="/signup" className="register">
            Register
          </a>
        </div>
      </nav>

      {/* Hero */}
      <main className="hero">
        <h1 className="heroTitle">
          Your digital identity,
          <br />
          <span>simplified.</span>
        </h1>
        <p className="heroText">
          Create stunning bio links, showcase your content, and connect with
          your audience. thebiolink.lol gives you the tools to build your online
          presence — beautifully.
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
          />
          <button onClick={goToLink}>Claim</button>
        </div>

        {/* Features */}
        <section className="features">
          <div className="featureCard">
            <h3>⚡ Instant Setup</h3>
            <p>No signup needed. Claim and go.</p>
          </div>
          <div className="featureCard">
            <h3>🎨 Fully Customizable</h3>
            <p>Design your profile, links, and avatar with ease.</p>
          </div>
          <div className="featureCard">
            <h3>🔒 No Tracking</h3>
            <p>We respect your privacy. No ads, no cookies, no spam.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 thebiolink.lol — One link. Infinite possibilities.</p>
      </footer>

      {/* CSS inside the file */}
      <style jsx>{`
        .container {
          min-height: 100vh;
          background: #0a0a0a;
          color: white;
          font-family: sans-serif;
          display: flex;
          flex-direction: column;
        }

        /* Navbar */
        .navbar {
          padding: 20px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #1f1f1f;
        }

        .logoArea {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logoCircle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(to right, #22c55e, #15803d);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 13px;
          color: black;
        }

        .brand {
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.5px;
        }

        .navLinks a {
          margin-left: 12px;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          text-decoration: none;
          transition: 0.2s ease;
        }

        .login {
          color: #ccc;
        }
        .login:hover {
          color: #fff;
        }

        .register {
          background: #22c55e;
          color: black;
          font-weight: 600;
        }
        .register:hover {
          background: #15803d;
        }

        /* Hero */
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
          font-size: 56px;
          font-weight: 800;
          margin-bottom: 20px;
          line-height: 1.2;
        }
        .heroTitle span {
          color: white;
        }

        .heroText {
          color: #aaa;
          font-size: 18px;
          max-width: 700px;
          margin-bottom: 50px;
          line-height: 1.6;
        }

        /* Claim Box */
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
        }

        .claimBox input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: white;
          padding: 15px;
          font-size: 15px;
        }

        .claimBox input::placeholder {
          color: #555;
        }

        .claimBox button {
          background: #22c55e;
          color: black;
          border: none;
          padding: 15px 25px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s ease;
        }
        .claimBox button:hover {
          background: #15803d;
        }

        /* Features */
        .features {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          max-width: 1000px;
          margin-top: 80px;
        }

        @media (min-width: 768px) {
          .features {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .featureCard {
          background: #111;
          border: 1px solid #222;
          padding: 24px;
          border-radius: 10px;
          text-align: left;
          transition: 0.2s ease;
        }
        .featureCard:hover {
          border-color: rgba(34, 197, 94, 0.5);
        }

        .featureCard h3 {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .featureCard p {
          color: #999;
          font-size: 14px;
          line-height: 1.5;
        }

        /* Footer */
        .footer {
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #777;
          border-top: 1px solid #1f1f1f;
        }
      `}</style>
    </div>
  );
}
