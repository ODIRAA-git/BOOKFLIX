import type { Book, BookRow as BookRowData } from "../../types/book";
import BookCard from "./BookCard";

interface BookRowProps {
  row: BookRowData;
  onSelectBook: (book: Book) => void;
}

function BookRow({ row, onSelectBook }: BookRowProps) {
  return (
    <div className="book-row">
      <h2 className="row-title">{row.title}</h2>
      <div className="books-container">
        <div className="books-track">
          {/* First set of books */}
          {row.books.map((book, bookIndex) => (
            <BookCard key={`first-${bookIndex}`} book={book} onSelect={onSelectBook} />
          ))}
          {/* Duplicate set for seamless loop */}
          {row.books.map((book, bookIndex) => (
            <BookCard key={`second-${bookIndex}`} book={book} onSelect={onSelectBook} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookRow;
