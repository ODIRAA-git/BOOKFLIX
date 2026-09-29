import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import "../styles/reader.css";
import ComingSoonNotice from "../components/reader/ComingSoonNotice";
import MoreInGenre from "../components/reader/MoreInGenre";
import { useAuth } from "../hooks/useAuth";
import { useWishlist } from "../hooks/useWishlist";
import { useTheme } from "../hooks/useTheme";
import { findBookBySlug } from "../data/books";

const WORDS_PER_MINUTE = 200;

function BookPage() {
  const { slug = "" } = useParams();
  const { user } = useAuth();
  // ProtectedRoute guarantees a signed-in user on this page
  const { isInWishlist, addToWishlist } = useWishlist(user as User);
  const { isDarkMode, toggleTheme } = useTheme();

  const match = findBookBySlug(slug);

  // Start at the top whenever a different book is opened
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    document.title = match ? `${match.book.title} | Bookflix` : "Book not found | Bookflix";
    return () => {
      document.title = "Bookflix | Discover your next great read";
    };
  }, [match]);

  const topBar = (
    <header className="reader-topbar">
      <Link to="/browse" className="reader-back">
        <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
          <path d="M16 10H5M9 5l-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Library
      </Link>
      <Link to="/browse" className="reader-logo">
        Bookflix
      </Link>
      <button
        className="reader-theme-toggle"
        onClick={toggleTheme}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>
    </header>
  );

  if (!match) {
    return (
      <div className="reader">
        {topBar}
        <main className="reader-missing">
          <h1 className="reader-title">We couldn't find that book</h1>
          <p>It may have been moved, or the link might be mistyped.</p>
          <Link to="/browse" className="reader-btn reader-btn-primary">
            Back to Library
          </Link>
        </main>
      </div>
    );
  }

  const { book, genre } = match;
  const inWishlist = isInWishlist(book.title);
  const readingMinutes = Math.max(1, Math.round(book.prologue.split(/\s+/).length / WORDS_PER_MINUTE));
  const moreBooks = genre.books.filter((item) => item.title !== book.title).slice(0, 6);

  return (
    <div className="reader">
      {topBar}

      <main>
        <section className="reader-hero">
          <div
            className="reader-hero-backdrop"
            style={{ backgroundImage: `url(${book.image})` }}
            aria-hidden="true"
          />
          <div className="reader-container reader-hero-inner">
            <img src={book.image} alt={`Cover of ${book.title}`} className="reader-cover" />
            <div className="reader-hero-info">
              <span className="reader-genre">{genre.title}</span>
              <h1 className="reader-title">{book.title}</h1>
              <p className="reader-meta">
                <span className="reader-meta-rating">⭐ {book.rating.toFixed(1)} / 5.0</span>
                <span aria-hidden="true">·</span>
                <span>Prologue · {readingMinutes} min read</span>
              </p>
              <div className="reader-hero-actions">
                <a href="#prologue" className="reader-btn reader-btn-primary">
                  Read the Prologue
                </a>
                <button
                  className="reader-btn reader-btn-secondary"
                  onClick={() => addToWishlist(book)}
                  disabled={inWishlist}
                >
                  {inWishlist ? "Saved to Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="reader-container reader-body">
          <article className="reader-page" id="prologue">
            <p className="reader-page-kicker">Prologue</p>
            <p className="reader-prose">{book.prologue}</p>
            <div className="reader-ornament" aria-hidden="true">
              ❦
            </div>
          </article>

          <ComingSoonNotice inWishlist={inWishlist} onAddToWishlist={() => addToWishlist(book)} />

          <MoreInGenre genre={genre.title} books={moreBooks} />
        </div>
      </main>
    </div>
  );
}

export default BookPage;
