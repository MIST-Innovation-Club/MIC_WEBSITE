import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Cpu } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError("Sign-in failed. Check your email and password.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="section-pad flex items-center justify-center min-h-[70vh]">
      <div className="card p-8 w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-8">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 border border-brand/30 text-brand-light">
            <Cpu className="h-5 w-5" />
          </span>
          <p className="font-display font-semibold text-ink-100">Admin Sign In</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-field">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="exec@mic.mist.edu"
            />
          </div>
          <div>
            <label className="label-field">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button disabled={busy} type="submit" className="btn-primary w-full">
            <LogIn className="h-4 w-4" /> {busy ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <p className="text-xs text-ink-400 mt-6">
          Admin accounts are created by an existing admin via the Firebase console — there's no public
          sign-up. Contact a club exec if you need access.
        </p>
      </div>
    </div>
  );
}
