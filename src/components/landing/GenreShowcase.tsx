import type { BookRow } from "../../types/book";

const taglines: Record<string, string> = {
  Fantasy: "Dragons, witches and worlds beyond ours",
  Fiction: "Stories that stay with you",
  Romance: "Slow burns and second chances",
  "Mystery & Thriller": "Twists you won't see coming",
  Horror: "Best read with the lights on",
  Poetry: "Verses for every feeling",
};

interface GenreShowcaseProps {
  genreRows: BookRow[];
  onSelectGenre: () => void;
}

function GenreShowcase({ genreRows, onSelectGenre }: GenreShowcaseProps) {
  return (
    <section className="landing-section landing-section-alt" id="genres">
      <div className="landing-container">
        <div className="landing-section-header">
          <p className="landing-kicker">The library</p>
          <h2 className="landing-section-title">A shelf for every mood</h2>
          <p className="landing-section-subtitle">
            Create a free account to open every shelf, read the prologues and start your wishlist.
          </p>
        </div>
        <div className="genre-grid">
          {genreRows.map((row) => (
            <button
              key={row.title}
              className="genre-tile"
              onClick={onSelectGenre}
              aria-label={`Sign up to explore ${row.title}`}
            >
              <div className="genre-covers" aria-hidden="true">
                {row.books.slice(0, 3).map((book) => (
                  <img key={book.title} src={book.image} alt="" loading="lazy" />
                ))}
              </div>
              <div className="genre-info">
                <h3 className="genre-name">{row.title}</h3>
                <p className="genre-tagline">{taglines[row.title]}</p>
                <span className="genre-meta">
                  {row.books.length} books
                  <span className="genre-unlock">
                    <svg aria-hidden="true" viewBox="0 0 20 20" width="14" height="14">
                      <rect x="4" y="9" width="12" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M7 9V6.5a3 3 0 0 1 6 0V9" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                    Unlock shelf
                  </span>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GenreShowcase;
