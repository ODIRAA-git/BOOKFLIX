import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import NavBar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/browse/HeroSection";
import BookRow from "../components/browse/BookRow";
import BookDetailsModal from "../components/books/BookDetailsModal";
import ProfileModal from "../components/profile/ProfileModal";
import { useAuth } from "../hooks/useAuth";
import { useWishlist } from "../hooks/useWishlist";
import { useTheme } from "../hooks/useTheme";
import { bookRows, genres } from "../data/books";
import type { Book } from "../types/book";

function BrowsePage() {
  const { user, signOut } = useAuth();
  // ProtectedRoute guarantees a signed-in user on this page
  const currentUser = user as User;
  const { wishlist, isInWishlist, addToWishlist, removeFromWishlist } = useWishlist(currentUser);
  const { isDarkMode, toggleTheme } = useTheme();

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const firstName = (currentUser.user_metadata?.full_name as string | undefined)?.split(" ")[0] || "reader";

  const handleBrowseGenres = () => {
    document.getElementById("genres-section")?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to a genre row and briefly highlight it
  const handleGenreSearch = (genre: string) => {
    setSearchQuery("");
    setShowSearch(false);

    const genresSection = document.getElementById("genres-section");
    if (genresSection) {
      genresSection.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        const genreTitles = document.querySelectorAll(".row-title");
        genreTitles.forEach((title) => {
          if (title.textContent?.toLowerCase().includes(genre.toLowerCase())) {
            title.scrollIntoView({ behavior: "smooth", block: "center" });
            title.classList.add("highlight");
            setTimeout(() => title.classList.remove("highlight"), 2000);
          }
        });
      }, 500);
    }
  };

  const filteredGenres = genres.filter((genre) =>
    genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <NavBar
        user={currentUser}
        isDarkMode={isDarkMode}
        showDropdown={showDropdown}
        showSearch={showSearch}
        searchQuery={searchQuery}
        availableGenres={genres}
        filteredGenres={filteredGenres}
        onToggleTheme={toggleTheme}
        onToggleDropdown={() => setShowDropdown(!showDropdown)}
        onToggleSearch={() => setShowSearch(!showSearch)}
        onSearchChange={setSearchQuery}
        onGenreSearch={handleGenreSearch}
        onOpenProfile={() => setShowProfile(true)}
        onLogout={signOut}
        onBrowseGenres={handleBrowseGenres}
      />

      <HeroSection
        userName={firstName}
        onBrowseGenres={handleBrowseGenres}
        onOpenWishlist={() => setShowProfile(true)}
      />

      <div className="content" id="genres-section">
        {bookRows.map((row) => (
          <BookRow key={row.title} row={row} onSelectBook={setSelectedBook} />
        ))}
      </div>

      {selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          inWishlist={isInWishlist(selectedBook.title)}
          onAddToWishlist={addToWishlist}
          onClose={() => setSelectedBook(null)}
        />
      )}

      {showProfile && (
        <ProfileModal
          user={currentUser}
          wishlist={wishlist}
          onViewBook={setSelectedBook}
          onRemoveBook={removeFromWishlist}
          onClose={() => setShowProfile(false)}
        />
      )}

      <Footer />
    </div>
  );
}

export default BrowsePage;
