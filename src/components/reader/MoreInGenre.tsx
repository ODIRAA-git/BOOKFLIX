import { Link } from "react-router-dom";
import type { Book } from "../../types/book";
import { toSlug } from "../../data/books";

interface MoreInGenreProps {
  genre: string;
  books: Book[];
}

function MoreInGenre({ genre, books }: MoreInGenreProps) {
  if (books.length === 0) return null;

  return (
    <section className="reader-more" aria-labelledby="reader-more-title">
      <h2 id="reader-more-title" className="reader-section-title">
        More in {genre}
      </h2>
      <div className="reader-more-grid">
        {books.map((book) => (
          <Link key={book.title} to={`/book/${toSlug(book.title)}`} className="reader-more-card">
            <img src={book.image} alt="" loading="lazy" />
            <span className="reader-more-title">{book.title}</span>
            <span className="reader-more-rating">⭐ {book.rating.toFixed(1)}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default MoreInGenre;
