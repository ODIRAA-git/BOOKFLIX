import type { User } from "@supabase/supabase-js";

interface NavBarProps {
  user: User;
  isDarkMode: boolean;
  showDropdown: boolean;
  showSearch: boolean;
  searchQuery: string;
  availableGenres: string[];
  filteredGenres: string[];
  onToggleTheme: () => void;
  onToggleDropdown: () => void;
  onToggleSearch: () => void;
  onSearchChange: (query: string) => void;
  onGenreSearch: (genre: string) => void;
  onOpenProfile: () => void;
  onLogout: () => void;
  onBrowseGenres: () => void;
}

function NavBar({
  user,
  isDarkMode,
  showDropdown,
  showSearch,
  searchQuery,
  availableGenres,
  filteredGenres,
  onToggleTheme,
  onToggleDropdown,
  onToggleSearch,
  onSearchChange,
  onGenreSearch,
  onOpenProfile,
  onLogout,
  onBrowseGenres,
}: NavBarProps) {

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">Bookflix</div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="nav-link active"
          >
            Home
          </button>
          <button onClick={onBrowseGenres} className="nav-link">
            Genres
          </button>
          <button onClick={onOpenProfile} className="nav-link">
            My Wishlist
          </button>
        </div>
        <div className="nav-right">
          <button className="search-icon" onClick={onToggleSearch}>
            🔍
          </button>
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          <div className="user-menu">
            <button className="user-icon" onClick={onToggleDropdown}>
              👤
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-user-info">{user.email}</div>
                <button
                  onClick={() => {
                    onOpenProfile();
                    onToggleDropdown();
                  }}
                  className="dropdown-item"
                >
                  View Profile
                </button>
                <button onClick={onLogout} className="dropdown-item">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      {showSearch && (
        <div className="search-modal">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search for genres..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              autoFocus
            />
            <button
              className="search-close"
              onClick={() => {
                onToggleSearch();
                onSearchChange("");
              }}
            >
              ×
            </button>
          </div>
          {searchQuery && (
            <div className="search-results">
              {filteredGenres.length > 0 ? (
                filteredGenres.map((genre, index) => (
                  <button
                    key={index}
                    className="search-result-item"
                    onClick={() => onGenreSearch(genre)}
                  >
                    <span className="search-icon-small">📚</span>
                    {genre}
                  </button>
                ))
              ) : (
                <div className="search-no-results">
                  No genres found matching "{searchQuery}"
                </div>
              )}
            </div>
          )}
          {!searchQuery && (
            <div className="search-suggestions">
              <p className="search-suggestions-title">Available Genres:</p>
              {availableGenres.map((genre, index) => (
                <button
                  key={index}
                  className="search-result-item"
                  onClick={() => onGenreSearch(genre)}
                >
                  <span className="search-icon-small">📚</span>
                  {genre}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default NavBar;
