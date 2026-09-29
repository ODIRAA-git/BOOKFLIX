import { useState } from "react";
import type { FormEvent } from "react";
import type { AuthError } from "@supabase/supabase-js";
import Modal from "../common/Modal";

interface SignupModalProps {
  onSignUp: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<{ error: AuthError | null }>;
  onClose: () => void;
  onSwitchToLogin: () => void;
  defaultEmail?: string;
}

function SignupModal({ onSignUp, onClose, onSwitchToLogin, defaultEmail }: SignupModalProps) {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const fullName = formData.get("fullName") as string;

    if (password !== confirmPassword) {
      setAuthError("Passwords do not match");
      setLoading(false);
      return;
    }

    const { error } = await onSignUp(email, password, fullName);

    setLoading(false);

    if (error) {
      setAuthError(error.message);
    } else {
      setAuthError(null);
      alert("Signup successful! Please check your email to confirm your account.");
      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="modal-title">Sign Up for Bookflix</h2>
      {authError && <div className="auth-error">{authError}</div>}
      <form className="auth-form" onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="signup-name">Full Name</label>
          <input
            type="text"
            id="signup-name"
            name="fullName"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-email">Email</label>
          <input
            type="email"
            id="signup-email"
            name="email"
            placeholder="Enter your email"
            defaultValue={defaultEmail}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-password">Password</label>
          <input
            type="password"
            id="signup-password"
            name="password"
            placeholder="Create a password"
            minLength={6}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-confirm">Confirm Password</label>
          <input
            type="password"
            id="signup-confirm"
            name="confirmPassword"
            placeholder="Confirm your password"
            minLength={6}
            required
          />
        </div>
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <p className="auth-switch">
        Already have an account?{" "}
        <button onClick={onSwitchToLogin} className="switch-link">
          Login
        </button>
      </p>
    </Modal>
  );
}

export default SignupModal;
