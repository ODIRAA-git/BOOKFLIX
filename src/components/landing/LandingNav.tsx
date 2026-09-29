import { useEffect, useState } from "react";

interface LandingNavProps {
  onSignIn: () => void;
  onGetStarted: () => void;
}

function LandingNav({ onSignIn, onGetStarted }: LandingNavProps) {
  const [scrolled, setScrolled] = useState(false);

  // Switch from transparent to solid once the visitor scrolls past the top
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`landing-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="landing-container landing-nav-inner">
        <a href="#top" className="landing-logo" aria-label="Bookflix home">
          Bookflix
        </a>
        <nav className="landing-nav-links" aria-label="Page sections">
          <a href="#features">Features</a>
          <a href="#genres">Genres</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="landing-nav-actions">
          <button className="landing-btn landing-btn-ghost" onClick={onSignIn}>
            Sign In
          </button>
          <button className="landing-btn landing-btn-primary landing-nav-cta" onClick={onGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

export default LandingNav;
