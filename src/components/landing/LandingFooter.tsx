function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="landing-container landing-footer-inner">
        <div>
          <a href="#top" className="landing-logo">
            Bookflix
          </a>
          <p className="landing-footer-tagline">Discover your next great read.</p>
        </div>
        <nav className="landing-footer-links" aria-label="Footer">
          <a href="#features">Features</a>
          <a href="#genres">Genres</a>
          <a href="#faq">FAQ</a>
          <a href="https://github.com/ODIRAA-git/BOOKFLIX" target="_blank" rel="noreferrer">
            Source on GitHub
          </a>
        </nav>
      </div>
      <div className="landing-container landing-footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bookflix</p>
        <p>Built with React, TypeScript and Supabase</p>
      </div>
    </footer>
  );
}

export default LandingFooter;
