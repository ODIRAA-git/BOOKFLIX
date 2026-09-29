import type { Book } from "../../types/book";
import EmailCapture from "./EmailCapture";

interface LandingHeroProps {
  covers: Book[];
  bookCount: number;
  genreCount: number;
  onGetStarted: (email: string) => void;
  onTryDemo: () => void;
  demoLoading: boolean;
  demoError: string | null;
}

const WALL_COLUMNS = 6;

function LandingHero({
  covers,
  bookCount,
  genreCount,
  onGetStarted,
  onTryDemo,
  demoLoading,
  demoError,
}: LandingHeroProps) {
  // Deal the covers into columns for the drifting background wall
  const columns = Array.from({ length: WALL_COLUMNS }, (_, col) =>
    covers.filter((_, index) => index % WALL_COLUMNS === col)
  );

  return (
    <section className="landing-hero" id="top">
      <div className="cover-wall" aria-hidden="true">
        {columns.map((column, colIndex) => (
          <div
            key={colIndex}
            className={`cover-wall-column ${colIndex % 2 ? "is-reverse" : ""}`}
            style={{ animationDuration: `${60 + colIndex * 8}s` }}
          >
            {/* Rendered twice so the vertical loop is seamless */}
            {[...column, ...column].map((book, index) => (
              <img key={index} src={book.image} alt="" className="cover-wall-img" />
            ))}
          </div>
        ))}
      </div>
      <div className="landing-hero-shade" aria-hidden="true" />

      <div className="landing-container landing-hero-content">
        <p className="landing-eyebrow">
          <span className="landing-eyebrow-dot" aria-hidden="true" />
          {bookCount}+ hand-picked stories across {genreCount} genres
        </p>
        <h1 className="landing-hero-title">
          Find your next great read <em>before page one.</em>
        </h1>
        <p className="landing-hero-subtitle">
          Browse novels by genre, read the prologue before you commit, and keep a
          wishlist of everything you want to read next. Free to join.
        </p>

        <EmailCapture onSubmit={onGetStarted} />

        <div className="landing-demo">
          <button className="landing-demo-link" onClick={onTryDemo} disabled={demoLoading}>
            {demoLoading ? "Opening the demo…" : "Just looking? Try the demo account"}
            {!demoLoading && (
              <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16">
                <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          {demoError && (
            <p className="landing-demo-error" role="alert">
              {demoError}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default LandingHero;
