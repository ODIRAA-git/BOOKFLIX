import { Link } from "react-router-dom";

interface ComingSoonNoticeProps {
  inWishlist: boolean;
  onAddToWishlist: () => void;
}

function ComingSoonNotice({ inWishlist, onAddToWishlist }: ComingSoonNoticeProps) {
  return (
    <aside className="reader-notice" aria-labelledby="reader-notice-title">
      <div className="reader-notice-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 5.5C4.5 4 8 4 12 6c4-2 7.5-2 10-.5V19c-2.5-1.5-6-1.5-10 .5-4-2-7.5-2-10-.5z" />
          <path d="M12 6v13.5" />
        </svg>
      </div>
      <p className="reader-notice-kicker">End of preview</p>
      <h2 id="reader-notice-title" className="reader-notice-title">
        The rest of this story isn't on the shelf yet
      </h2>
      <p className="reader-notice-text">
        Bookflix is a demo project, so full books aren't available to read. You've reached
        the end of the preview. Save it to your wishlist so it's waiting for you, or find
        your next prologue in the library.
      </p>
      <div className="reader-notice-actions">
        <button className="reader-btn reader-btn-primary" onClick={onAddToWishlist} disabled={inWishlist}>
          {inWishlist ? "Saved to Wishlist" : "Add to Wishlist"}
        </button>
        <Link to="/browse" className="reader-btn reader-btn-secondary">
          Back to Library
        </Link>
      </div>
    </aside>
  );
}

export default ComingSoonNotice;
