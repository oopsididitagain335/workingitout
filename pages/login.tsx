// pages/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      router.push('/dashboard'); // ✅ Redirect to dashboard
    } else {
      setError(data.message);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="title">Log In</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="input-group">
            <label className="label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="button">
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <p className="footer-text">
          Don't have an account?{' '}
          <a href="/signup" className="link">Sign up</a>
        </p>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #000;
          padding: 20px;
        }
        .form-wrapper {
          width: 100%;
          max-width: 400px;
          padding: 32px;
          background: #111;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          border: 1px solid #222;
        }
        .title {
          font-size: 28px;
          font-weight: 700;
          color: white;
          text-align: center;
          margin-bottom: 24px;
        }
        .input-group {
          margin-bottom: 20px;
        }
        .label {
          display: block;
          font-size: 14px;
          color: #aaa;
          margin-bottom: 8px;
        }
        .input {
          width: 100%;
          padding: 14px;
          background: #222;
          border: 1px solid #333;
          border-radius: 8px;
          color: white;
          font-size: 15px;
          outline: none;
        }
        .input:focus {
          border-color: #10b981;
        }
        .button {
          width: 100%;
          padding: 14px;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }
        .button:hover:not(:disabled) {
          background: #0d946e;
        }
        .button:disabled {
          background: #0a7a5c;
        }
        .error {
          color: #ef4444;
          font-size: 14px;
          text-align: center;
          margin-bottom: 16px;
        }
        .footer-text {
          color: #999;
          font-size: 14px;
          text-align: center;
          margin-top: 20px;
        }
        .link {
          color: #10b981;
          text-decoration: none;
        }
        .link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
