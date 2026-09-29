import { useRef, useState } from "react";
import type { FormEvent } from "react";
import type { AuthError } from "@supabase/supabase-js";
import Modal from "../common/Modal";

const DEMO_EMAIL = "demo@bookflix.com";
const DEMO_PASSWORD = "book023";

interface LoginModalProps {
  onSignIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  onClose: () => void;
  onSwitchToSignup: () => void;
}

function LoginModal({ onSignIn, onClose, onSwitchToSignup }: LoginModalProps) {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const loginFormRef = useRef<HTMLFormElement>(null);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await onSignIn(email, password);

    setLoading(false);

    if (error) {
      setAuthError(error.message);
    } else {
      setAuthError(null);
      onClose();
    }
  };

  // Continue as guest: pre-fill the demo credentials and submit the login form
  const handleGuestLogin = () => {
    const form = loginFormRef.current;
    if (!form) return;
    (form.elements.namedItem("email") as HTMLInputElement).value = DEMO_EMAIL;
    (form.elements.namedItem("password") as HTMLInputElement).value = DEMO_PASSWORD;
    form.requestSubmit();
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="modal-title">Login to Bookflix</h2>
      {authError && <div className="auth-error">{authError}</div>}
      <form className="auth-form" onSubmit={handleLogin} ref={loginFormRef}>
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input
            type="email"
            id="login-email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            type="password"
            id="login-password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <button type="button" className="forgot-password">
            Forgot password?
          </button>
        </div>
        <div className="auth-button-row">
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <button
            type="button"
            className="auth-button guest-button"
            onClick={handleGuestLogin}
            disabled={loading}
          >
            Continue as Guest
          </button>
        </div>
      </form>
      <p className="demo-note">
        Recruiter or reviewer? Use {DEMO_EMAIL} / {DEMO_PASSWORD} to log in.
      </p>
      <p className="auth-switch">
        Don't have an account?{" "}
        <button onClick={onSwitchToSignup} className="switch-link">
          Sign Up
        </button>
      </p>
    </Modal>
  );
}

export default LoginModal;
