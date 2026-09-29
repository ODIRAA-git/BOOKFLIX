import { useId, useState } from "react";
import type { FormEvent } from "react";

interface EmailCaptureProps {
  onSubmit: (email: string) => void;
  prompt?: string;
}

/** Netflix-style "enter your email to get started" form that hands off to the sign-up modal */
function EmailCapture({
  onSubmit,
  prompt = "Ready to start reading? Enter your email to create your free account.",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const inputId = useId();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email.trim());
  };

  return (
    <form className="email-capture" onSubmit={handleSubmit}>
      <label htmlFor={inputId} className="email-capture-prompt">
        {prompt}
      </label>
      <div className="email-capture-row">
        <input
          id={inputId}
          type="email"
          className="email-capture-input"
          placeholder="Email address"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="landing-btn landing-btn-primary landing-btn-lg">
          Get Started
          <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
            <path d="M7 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default EmailCapture;
