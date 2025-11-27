import Wallpaper from "../assets/Wallpaper.jpg";

interface HeroSectionProps {
  onStartReading: () => void;
  onBrowseGenres: () => void;
}

function HeroSection({ onStartReading, onBrowseGenres }: HeroSectionProps) {
  return (
    <div className="hero-section" style={{ backgroundImage: `url(${Wallpaper})` }}>
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Bookflix</h1>
          <p className="hero-description">
            Discover thousands of captivating novels from talented authors across the globe.
            From thrilling mysteries to heartwarming romances, epic fantasies to powerful poetry
            your next great read awaits. Browse by genre, save your favorites to your wishlist,
            and dive into prologues before committing to your next literary adventure.
          </p>
          <div className="hero-buttons">
            <button className="hero-button primary" onClick={onStartReading}>
              Start Reading
            </button>
            <button className="hero-button secondary" onClick={onBrowseGenres}>
              Browse Genres
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
