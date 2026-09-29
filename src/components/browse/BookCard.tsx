import type { Book } from "../../types/book";

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
}

function BookCard({ book, onSelect }: BookCardProps) {
  return (
    <div className="book-card" onClick={() => onSelect(book)}>
      <img src={book.image} alt={book.title} />
      <div className="book-overlay">
        <div className="book-rating">⭐ {book.rating.toFixed(1)}</div>
      </div>
    </div>
  );
}

export default BookCard;
