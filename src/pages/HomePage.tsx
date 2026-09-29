import { useState } from "react";
import NavBar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import BookRow from "../components/home/BookRow";
import LoginModal from "../components/auth/LoginModal";
import SignupModal from "../components/auth/SignupModal";
import BookDetailsModal from "../components/books/BookDetailsModal";
import ProfileModal from "../components/profile/ProfileModal";
import { useAuth } from "../hooks/useAuth";
import { useWishlist } from "../hooks/useWishlist";
import { useTheme } from "../hooks/useTheme";
import { bookRows, genres } from "../data/books";
import type { Book } from "../types/book";

type AuthModal = "login" | "signup" | null;

function HomePage() {
  const { user, signUp, signIn, signOut } = useAuth();
  const { wishlist, isInWishlist, addToWishlist, removeFromWishlist } = useWishlist(user);
  const { isDarkMode, toggleTheme } = useTheme();

  const [authModal, setAuthModal] = useState<AuthModal>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openAuthModal = (modal: Exclude<AuthModal, null>) => {
    setAuthModal(modal);
    setShowDropdown(false);
    setSelectedBook(null);
  };
  const openLogin = () => openAuthModal("login");
  const openSignup = () => openAuthModal("signup");

  const handleLogout = async () => {
    await signOut();
    setShowDropdown(false);
    setShowProfile(false);
  };

  const handleAddToWishlist = (book: Book) => {
    if (!user) {
      alert("Please log in to add books to your wishlist");
      openLogin();
      return;
    }
    addToWishlist(book);
  };

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
        user={user}
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
        onOpenLogin={openLogin}
        onOpenSignup={openSignup}
        onOpenProfile={() => setShowProfile(true)}
        onLogout={handleLogout}
        onBrowseGenres={handleBrowseGenres}
      />

      <HeroSection onStartReading={openSignup} onBrowseGenres={handleBrowseGenres} />

      <div className="content" id="genres-section">
        {bookRows.map((row) => (
          <BookRow key={row.title} row={row} onSelectBook={setSelectedBook} />
        ))}
      </div>

      {authModal === "signup" && (
        <SignupModal
          onSignUp={signUp}
          onClose={() => setAuthModal(null)}
          onSwitchToLogin={openLogin}
        />
      )}

      {authModal === "login" && (
        <LoginModal
          onSignIn={signIn}
          onClose={() => setAuthModal(null)}
          onSwitchToSignup={openSignup}
        />
      )}

      {selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          inWishlist={isInWishlist(selectedBook.title)}
          onAddToWishlist={handleAddToWishlist}
          onStartReading={openSignup}
          onClose={() => setSelectedBook(null)}
        />
      )}

      {showProfile && user && (
        <ProfileModal
          user={user}
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

export default HomePage;
