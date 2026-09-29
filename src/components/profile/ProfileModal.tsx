import type { User } from "@supabase/supabase-js";
import type { Book } from "../../types/book";

interface ProfileModalProps {
  user: User;
  wishlist: Book[];
  onViewBook: (book: Book) => void;
  onRemoveBook: (bookTitle: string) => void;
  onClose: () => void;
}

function ProfileModal({ user, wishlist, onViewBook, onRemoveBook, onClose }: ProfileModalProps) {
  return (
    <div className="profile-overlay">
      <div className="profile-container">
        <button className="profile-close" onClick={onClose}>
          ×
        </button>
        <div className="profile-header">
          <div className="profile-avatar">👤</div>
          <div className="profile-info">
            <h2 className="profile-name">{user.user_metadata?.full_name || "User"}</h2>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>

        <div className="profile-section">
          <h3 className="profile-section-title">My Wishlist ({wishlist.length} books)</h3>
          {wishlist.length === 0 ? (
            <p className="empty-wishlist">Your wishlist is empty. Start adding books!</p>
          ) : (
            <div className="wishlist-grid">
              {wishlist.map((book) => (
                <div key={book.title} className="wishlist-card">
                  <div className="wishlist-card-image">
                    <img src={book.image} alt={book.title} />
                  </div>
                  <div className="wishlist-card-info">
                    <h4 className="wishlist-card-title">{book.title}</h4>
                    <div className="wishlist-card-rating">⭐ {book.rating.toFixed(1)}</div>
                    <p className="wishlist-card-prologue">
                      {book.prologue.substring(0, 100)}...
                    </p>
                    <div className="wishlist-card-actions">
                      <button onClick={() => onViewBook(book)} className="wishlist-btn view">
                        View Details
                      </button>
                      <button
                        onClick={() => onRemoveBook(book.title)}
                        className="wishlist-btn remove"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
