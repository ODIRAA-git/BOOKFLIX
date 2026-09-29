import { useEffect, useState } from "react";
import "../styles/landing.css";
import LandingNav from "../components/landing/LandingNav";
import LandingHero from "../components/landing/LandingHero";
import FeatureGrid from "../components/landing/FeatureGrid";
import GenreShowcase from "../components/landing/GenreShowcase";
import HowItWorks from "../components/landing/HowItWorks";
import Faq from "../components/landing/Faq";
import EmailCapture from "../components/landing/EmailCapture";
import LandingFooter from "../components/landing/LandingFooter";
import LoginModal from "../components/auth/LoginModal";
import SignupModal from "../components/auth/SignupModal";
import { useAuth } from "../hooks/useAuth";
import { allBooks, genreRows } from "../data/books";
import { DEMO_EMAIL, DEMO_PASSWORD } from "../lib/demoAccount";

type AuthModal = "login" | "signup" | null;

const genreNames = genreRows.map((row) => row.title);

function LandingPage() {
  const { signIn, signUp } = useAuth();
  const [authModal, setAuthModal] = useState<AuthModal>(null);
  const [signupEmail, setSignupEmail] = useState("");
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoError, setDemoError] = useState<string | null>(null);

  // The landing page is always presented in the dark brand theme
  useEffect(() => {
    document.body.className = "dark-mode";
  }, []);

  const openSignup = (email = "") => {
    setSignupEmail(email);
    setAuthModal("signup");
  };

  // Signing in updates the auth state, and PublicOnlyRoute then redirects to /browse
  const handleTryDemo = async () => {
    setDemoLoading(true);
    setDemoError(null);
    const { error } = await signIn(DEMO_EMAIL, DEMO_PASSWORD);
    if (error) {
      setDemoError("The demo account is unavailable right now. Please try again or create an account.");
      setDemoLoading(false);
    }
  };

  return (
    <div className="landing">
      <LandingNav onSignIn={() => setAuthModal("login")} onGetStarted={() => openSignup()} />

      <main>
        <LandingHero
          covers={allBooks}
          bookCount={allBooks.length}
          genreCount={genreRows.length}
          onGetStarted={openSignup}
          onTryDemo={handleTryDemo}
          demoLoading={demoLoading}
          demoError={demoError}
        />
        <FeatureGrid />
        <GenreShowcase genreRows={genreRows} onSelectGenre={() => openSignup()} />
        <HowItWorks />
        <Faq genreNames={genreNames} />

        <section className="landing-cta">
          <div className="landing-container landing-container-narrow">
            <h2 className="landing-cta-title">Your next favourite book is waiting.</h2>
            <EmailCapture
              onSubmit={openSignup}
              prompt="Enter your email to create your free account."
            />
          </div>
        </section>
      </main>

      <LandingFooter />

      {authModal === "signup" && (
        <SignupModal
          onSignUp={signUp}
          defaultEmail={signupEmail}
          onClose={() => setAuthModal(null)}
          onSwitchToLogin={() => setAuthModal("login")}
        />
      )}

      {authModal === "login" && (
        <LoginModal
          onSignIn={signIn}
          onClose={() => setAuthModal(null)}
          onSwitchToSignup={() => openSignup()}
        />
      )}
    </div>
  );
}

export default LandingPage;
