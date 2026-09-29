import Wallpaper from "../../assets/Wallpaper.webp";

interface HeroSectionProps {
  userName: string;
  onBrowseGenres: () => void;
  onOpenWishlist: () => void;
}

function HeroSection({ userName, onBrowseGenres, onOpenWishlist }: HeroSectionProps) {
  return (
    <div className="hero-section" style={{ backgroundImage: `url(${Wallpaper})` }}>
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">Welcome back, {userName}</h1>
          <p className="hero-description">
            Pick up where your curiosity left off. Scroll through every genre, open any
            cover to read its prologue, and save the ones you love to your wishlist.
          </p>
          <div className="hero-buttons">
            <button className="hero-button primary" onClick={onBrowseGenres}>
              Browse Genres
            </button>
            <button className="hero-button secondary" onClick={onOpenWishlist}>
              My Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
