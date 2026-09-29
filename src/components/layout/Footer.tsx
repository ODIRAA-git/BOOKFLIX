function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Bookflix</h3>
          <p className="footer-description">
            Your premier destination for discovering captivating novels from around the world.
            Read prologues, save favorites, and explore endless literary adventures.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#genres">Genres</a>
            </li>
            <li>
              <a href="#authors">Authors</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Genres</h4>
          <ul className="footer-links">
            <li>
              <a href="#fantasy">Fantasy</a>
            </li>
            <li>
              <a href="#romance">Romance</a>
            </li>
            <li>
              <a href="#mystery">Mystery & Thriller</a>
            </li>
            <li>
              <a href="#horror">Horror</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Support</h4>
          <ul className="footer-links">
            <li>
              <a href="#help">Help Center</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="#terms">Terms of Service</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Connect With Us</h4>
          <div className="footer-social">
            <a href="#facebook" className="social-link" aria-label="Facebook">
              📘
            </a>
            <a href="#twitter" className="social-link" aria-label="Twitter">
              🐦
            </a>
            <a href="#instagram" className="social-link" aria-label="Instagram">
              📷
            </a>
            <a href="#linkedin" className="social-link" aria-label="LinkedIn">
              💼
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; {currentYear} Bookflix. All rights reserved.
        </p>
        <div className="footer-bottom-links">
          <a href="#privacy">Privacy Policy</a>
          <span className="separator">|</span>
          <a href="#terms">Terms & Conditions</a>
          <span className="separator">|</span>
          <a href="#cookies">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
