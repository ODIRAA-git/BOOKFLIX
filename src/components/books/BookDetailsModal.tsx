import type { Book } from "../../types/book";
import Modal from "../common/Modal";

interface BookDetailsModalProps {
  book: Book;
  inWishlist: boolean;
  onAddToWishlist: (book: Book) => void;
  onClose: () => void;
}

function BookDetailsModal({
  book,
  inWishlist,
  onAddToWishlist,
  onClose,
}: BookDetailsModalProps) {
  return (
    <Modal onClose={onClose} className="book-details-modal">
      <div className="book-details-content">
        <div className="book-details-image">
          <img src={book.image} alt={book.title} />
        </div>
        <div className="book-details-info">
          <h2 className="book-details-title">{book.title}</h2>
          <div className="book-details-rating">
            <span className="rating-stars">
              {"⭐".repeat(Math.floor(book.rating))}
              {book.rating % 1 >= 0.5 ? "⭐" : ""}
            </span>
            <span className="rating-number">{book.rating.toFixed(1)} / 5.0</span>
          </div>
          <div className="book-details-section">
            <h3>Prologue</h3>
            <p className="book-prologue">{book.prologue}</p>
          </div>
          <div className="book-details-actions">
            <button
              className="action-button primary"
              onClick={() => onAddToWishlist(book)}
              disabled={inWishlist}
            >
              {inWishlist ? "Already in Wishlist" : "Add to Wishlist"}
            </button>
            <button className="action-button secondary" onClick={onClose}>
              Keep Browsing
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default BookDetailsModal;
