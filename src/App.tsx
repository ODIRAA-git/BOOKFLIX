import { useState, useEffect } from "react";
import "./App.css";
import { supabase } from "./lib/supabase";
import type { User } from "@supabase/supabase-js";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import Book1 from "./assets/MysteryAndThriller/Book1.jpg";

// Fiction book covers
import FictionBeautifulLies from "./assets/Fiction/BeautifulLies.jpg";
import FictionBloodMark from "./assets/Fiction/BloodMark.webp";
import FictionDeadEyes from "./assets/Fiction/DeadEyes.webp";
import FictionGermanGirl from "./assets/Fiction/GermanGirl.jpg";
import FictionMaltese from "./assets/Fiction/Maltese.jpg";
import FictionOcean from "./assets/Fiction/Ocean.jpg";
import FictionRelic from "./assets/Fiction/Relic.png";
import FictionSoul from "./assets/Fiction/Soul.jpg";

// Horror book covers
import HorrorColdDresses from "./assets/Horror/ColdDresses.jpg";
import Horror1 from "./assets/Horror/Horror1.webp";
import HorrorNightmare from "./assets/Horror/Nightmare.jpg";
import HorrorTheGhost from "./assets/Horror/TheGhost.jpg";
import HorrorTheNight from "./assets/Horror/TheNight.jpg";
import HorrorVirginia from "./assets/Horror/Virginia.jpg";
import HorrorWhenDarkness from "./assets/Horror/WhenDarkness.webp";

// Romance book covers
import RomanceDukeBaby from "./assets/Romance/DukeBaby.jpg";
import RomanceFirstLove from "./assets/Romance/FirstLove.jpg";
import RomanceFirstLove2 from "./assets/Romance/FirstLove2.jpg";
import RomanceLegacyLove from "./assets/Romance/LegacyLove.jpg";
import RomanceSilverFate from "./assets/Romance/SilverFate.avif";
import RomanceSleepingWith from "./assets/Romance/SleepingWith.jpeg";
import RomanceSoulmate from "./assets/Romance/Soulmate.jpg";

// Mystery & Thriller book covers
import MysteryGoodSister from "./assets/MysteryAndThriller/GoodSister.jpg";
import MysteryHarryPotter from "./assets/MysteryAndThriller/HarryPotter.png";
import MysteryPastRising from "./assets/MysteryAndThriller/PastRising.jpg";
import MysteryPineHouse from "./assets/MysteryAndThriller/PineHouse.png";
import MysterySpace from "./assets/MysteryAndThriller/Space.webp";
import MysteryTakeMeBack from "./assets/MysteryAndThriller/TakeMeBack.webp";
import MysteryWeFall from "./assets/MysteryAndThriller/WeFall.png";

// Fantasy book covers
import FantasyEmbers from "./assets/Fantasy/Embers.jpg";
import FantasyEternityGate from "./assets/Fantasy/EternityGate.webp";
import FantasyHarryPotter from "./assets/Fantasy/HarryPotter.png";
import FantasyHiddenInFrost from "./assets/Fantasy/HiddenInFrost.jpg";
import FantasyPrinceAndWitch from "./assets/Fantasy/PrinceAndWitch.jpg";
import FantasySilverPromise from "./assets/Fantasy/SilverPromise.webp";
import FantasyTempest from "./assets/Fantasy/Tempest.jpeg";

// Poetry book covers
import PoetryBrute from "./assets/Poetry/Brute.jpg";
import PoetryExpat from "./assets/Poetry/Expat.jpeg";
import PoetryFoster from "./assets/Poetry/Foster.jpg";
import PoetryMotherhood from "./assets/Poetry/Motherhood.jpg";
import PoetryPetal from "./assets/Poetry/Petal.jpg";
import PoetryRisingTide from "./assets/Poetry/RisingTide.jpg";
import PoetryTears from "./assets/Poetry/Tears.jpg";
import PoetryWolfWider from "./assets/Poetry/WolfWider.jpg";

interface Book {
  image: string;
  title: string;
  prologue: string;
  rating: number;
}

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<Book[]>([]);
  const [showProfile, setShowProfile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
    setShowDropdown(false);
    setSelectedBook(null);
  };

  const openLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
    setShowDropdown(false);
    setSelectedBook(null);
  };

  const closeModals = () => {
    setShowSignup(false);
    setShowLogin(false);
  };

  const closeBookDetails = () => {
    setSelectedBook(null);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const openBookDetails = (book: Book) => {
    setSelectedBook(book);
  };

  // Check for existing session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchWishlist();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchWishlist();
      } else {
        setWishlist([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch wishlist when user changes
  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  // Handle signup
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const fullName = formData.get("fullName") as string;

    if (password !== confirmPassword) {
      setAuthError("Passwords do not match");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setAuthError(error.message);
    } else {
      setAuthError(null);
      alert("Signup successful! Please check your email to confirm your account.");
      closeModals();
    }
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setAuthError(error.message);
    } else {
      setAuthError(null);
      closeModals();
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setWishlist([]);
    setShowDropdown(false);
    setShowProfile(false);
  };

  // Fetch user's wishlist
  const fetchWishlist = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("wishlists")
      .select("*")
      .eq("user_id", user.id);

    if (!error && data) {
      const wishlistBooks: Book[] = data.map((item) => ({
        image: item.book_image,
        title: item.book_title,
        prologue: item.book_prologue,
        rating: item.book_rating,
      }));
      setWishlist(wishlistBooks);
    }
  };

  // Add book to wishlist
  const addToWishlist = async (book: Book) => {
    if (!user) {
      alert("Please log in to add books to your wishlist");
      openLogin();
      return;
    }

    // Check if already in wishlist
    const isInWishlist = wishlist.some((item) => item.title === book.title);
    if (isInWishlist) {
      alert("This book is already in your wishlist!");
      return;
    }

    const { error } = await supabase.from("wishlists").insert({
      user_id: user.id,
      book_title: book.title,
      book_image: book.image,
      book_prologue: book.prologue,
      book_rating: book.rating,
    });

    if (!error) {
      setWishlist([...wishlist, book]);
      alert("Book added to your wishlist!");
    } else {
      alert("Failed to add book to wishlist");
    }
  };

  // Remove book from wishlist
  const removeFromWishlist = async (bookTitle: string) => {
    if (!user) return;

    const { error } = await supabase
      .from("wishlists")
      .delete()
      .eq("user_id", user.id)
      .eq("book_title", bookTitle);

    if (!error) {
      setWishlist(wishlist.filter((book) => book.title !== bookTitle));
      alert("Book removed from wishlist");
    }
  };

  // Check if book is in wishlist
  const isInWishlist = (bookTitle: string) => {
    return wishlist.some((book) => book.title === bookTitle);
  };

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle genre search
  const handleGenreSearch = (genre: string) => {
    setSearchQuery("");
    setShowSearch(false);

    // Scroll to genres section first
    const genresSection = document.getElementById("genres-section");
    if (genresSection) {
      genresSection.scrollIntoView({ behavior: "smooth" });

      // After scrolling, find and highlight the specific genre
      setTimeout(() => {
        const genreTitles = document.querySelectorAll(".row-title");
        genreTitles.forEach((title) => {
          if (title.textContent?.toLowerCase().includes(genre.toLowerCase())) {
            title.scrollIntoView({ behavior: "smooth", block: "center" });
            // Add highlight effect
            title.classList.add("highlight");
            setTimeout(() => title.classList.remove("highlight"), 2000);
          }
        });
      }, 500);
    }
  };

  // Get available genres
  const availableGenres = [
    "Recommended Books",
    "Fantasy",
    "Fiction",
    "Romance",
    "Mystery & Thriller",
    "Horror",
    "Poetry",
  ];

  // Filter genres based on search query
  const filteredGenres = availableGenres.filter((genre) =>
    genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply theme to body
  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Helper function to create book objects with random ratings
  const createBook = (image: string, title: string, prologue: string): Book => ({
    image,
    title,
    prologue,
    rating: Math.floor(Math.random() * 21) / 10 + 3.5, // Random rating between 3.5 and 5.5
  });

  // Fiction Books
  const fictionBooks = [
    createBook(FictionBeautifulLies, "Beautiful Lies", "In a world where truth is currency, one woman's deception could save—or destroy—everything she holds dear. A gripping tale of secrets, lies, and the price of redemption."),
    createBook(FictionBloodMark, "Blood Mark", "When an ancient symbol appears on her skin, Sarah discovers she's the last in a bloodline of warriors destined to fight an evil that has awakened after centuries of slumber."),
    createBook(FictionDeadEyes, "Dead Eyes", "Detective Marcus Cole can see the last moments of murder victims through their eyes. But when the visions start showing him his own death, he must race against time to change fate itself."),
    createBook(FictionGermanGirl, "The German Girl", "Berlin, 1939. A young girl's journey from privilege to survival, as her family flees Nazi Germany aboard a ship that will change their lives forever. Based on true events."),
    createBook(FictionMaltese, "The Maltese Conspiracy", "A priceless artifact, a murdered collector, and a web of international intrigue. Private investigator Sam Ryder finds himself in a deadly game where everyone has something to hide."),
    createBook(FictionOcean, "Ocean's Whisper", "Stranded on a remote island after a shipwreck, marine biologist Elena discovers an underwater civilization that shouldn't exist—and a secret that could rewrite human history."),
    createBook(FictionRelic, "The Relic", "An archaeological expedition unearths more than ancient artifacts when they discover a relic with the power to grant immortality. But some discoveries should remain buried."),
    createBook(FictionSoul, "Soul Catcher", "In a city where souls can be stolen and sold, a thief with a conscience must choose between his lucrative career and saving the one person who still believes in his humanity."),
  ];

  // Horror Books
  const horrorBooks = [
    createBook(HorrorColdDresses, "Cold Dresses", "The vintage dress shop holds more than forgotten fashion. Each garment carries the memories—and malevolence—of its former owner. One dress, in particular, refuses to let go."),
    createBook(Horror1, "The Haunting Hour", "Every night at 3 AM, the screaming starts. The new tenants of Ashwood Manor thought it was just old pipes. They were wrong. Dead wrong."),
    createBook(HorrorNightmare, "Nightmare's Edge", "Sleep therapist Dr. Chen can enter patients' dreams to cure their nightmares. But when a patient's nightmare follows her into the waking world, she realizes some fears are meant to be left alone."),
    createBook(HorrorTheGhost, "The Ghost of Willow Creek", "A skeptical journalist investigating paranormal claims in a small town discovers that some legends are terrifyingly real—and some ghosts don't want their stories told."),
    createBook(HorrorTheNight, "The Night Keeper", "As the new night watchman at an abandoned asylum, Tom thought his biggest challenge would be boredom. Then he found the logbook detailing experiments that should never have been conducted."),
    createBook(HorrorVirginia, "Virginia's Curse", "Three centuries ago, Virginia was burned as a witch. Now her descendants are dying in increasingly disturbing ways. The last surviving heir must break the curse—or join her ancestors."),
    createBook(HorrorWhenDarkness, "When Darkness Falls", "In a town where the sun hasn't risen in three weeks, survivors huddle in dwindling circles of light. Because something in the darkness is hunting, and it's getting closer."),
  ];

  // Romance Books
  const romanceBooks = [
    createBook(RomanceDukeBaby, "The Duke's Secret Baby", "When Lady Charlotte returns to London society after a year abroad, she's hiding more than just her broken heart—she's hiding the Duke of Ashford's child, a secret that could ruin them both."),
    createBook(RomanceFirstLove, "First Love, Second Chance", "Ten years after their painful breakup, Emma and Jake are forced to work together on their best friends' wedding. Can they overcome past heartbreak to find their second chance at forever?"),
    createBook(RomanceFirstLove2, "Remember First Love", "After a car accident erases five years of her memory, including her marriage, Claire must fall in love with her husband all over again—if he'll give her the chance."),
    createBook(RomanceLegacyLove, "Legacy of Love", "Inheriting her grandmother's bookshop, Sophie discovers decades-old love letters that lead her on a journey to reunite two souls—and straight into the arms of her own unexpected romance."),
    createBook(RomanceSilverFate, "Silver Fate", "A fated mate rejected. A pack divided. When Alpha Marcus chose duty over his destined mate, he never imagined she'd return five years later as the leader of a rival pack."),
    createBook(RomanceSleepingWith, "Sleeping with the Enemy", "Corporate rivals by day, anonymous online confidants by night. When CEO Alexandra and her competition Dante discover each other's secret identity, everything changes."),
    createBook(RomanceSoulmate, "Soulmate Contract", "In a world where soulmates are scientifically matched, Lily and Noah enter a contract marriage to avoid their assigned partners. But fake feelings have a way of becoming real."),
  ];

  // Mystery & Thriller Books
  const mysteryBooks = [
    createBook(Book1, "The Final Clue", "A murder mystery party turns deadly when the fake victim becomes a real corpse. Now the guests must solve the actual murder—before the killer strikes again."),
    createBook(MysteryGoodSister, "The Good Sister", "Everyone thinks Mia is the perfect daughter. Only her sister knows the truth. When Mia disappears, the question isn't where she went—it's what she's planning."),
    createBook(MysteryHarryPotter, "The Cursed Legacy", "Years after the wizarding war, a series of impossible murders plague the magical community. An unlikely detective must unravel a conspiracy that reaches the highest levels of power."),
    createBook(MysteryPastRising, "Past Rising", "FBI profiler Kate Morrison retired after a case went wrong. But when a new killer emerges using her old nemesis's methods, she's pulled back into a game of cat and mouse—and this time, it's personal."),
    createBook(MysteryPineHouse, "The Pine House Murders", "Five strangers receive invitations to a remote mountain estate. One weekend, one house, and one by one, they start dying. The last one standing will inherit everything—if they survive."),
    createBook(MysterySpace, "Space Station Zero", "On humanity's first deep space station, a crew member is found murdered in a locked room. With no way off the station and a killer among them, paranoia spreads faster than oxygen leaks."),
    createBook(MysteryTakeMeBack, "Take Me Back", "When investigative journalist Rachel receives a package containing evidence of her sister's murder—a case closed 10 years ago—she must confront the past to stop a killer from striking again."),
    createBook(MysteryWeFall, "When We Fall", "A luxury resort built on a cliff. A reunion of college friends. When one of them falls to their death, detective Amy Chen discovers it wasn't an accident—and everyone has a motive."),
  ];

  // Fantasy Books
  const fantasyBooks = [
    createBook(FantasyEmbers, "Embers of Magic", "Born without magic in a family of powerful sorcerers, Aria discovers she possesses a rare and dangerous gift: the ability to steal others' powers. But some abilities come with deadly consequences."),
    createBook(FantasyEternityGate, "The Eternity Gate", "A portal between worlds is opening, and only the Guardian of the Gate can close it. Too bad the current Guardian is a struggling college student who didn't even know magic existed."),
    createBook(FantasyHarryPotter, "Chronicles of the Chosen", "An orphan discovers he's destined to defeat a dark sorcerer who murdered his parents. At a school of magic, he'll learn friendship, courage, and that the greatest power is love."),
    createBook(FantasyHiddenInFrost, "Hidden in Frost", "In a kingdom where winter never ends, Princess Elara must journey to the heart of the frozen wasteland to break an ancient curse—and confront the ice demon who's been waiting for her."),
    createBook(FantasyPrinceAndWitch, "The Prince and the Witch", "Prince Adrian was raised to hunt witches. Witch Selene was trained to fear the crown. When a greater evil threatens both their worlds, enemies must become allies—or watch everything burn."),
    createBook(FantasySilverPromise, "The Silver Promise", "A thief, a fallen prince, and a prophecy that could save or destroy the realm. Luna never wanted to be a hero, but when she steals a magical artifact, destiny has other plans."),
    createBook(FantasyTempest, "Tempest Born", "Storm wielder Kira has hidden her powers for years. But when her homeland is attacked, she must embrace her abilities and face the truth: she's the reincarnation of the legendary Storm Queen."),
  ];

  // Poetry Books
  const poetryBooks = [
    createBook(PoetryBrute, "Brute: Poems", "Raw, unflinching verses that explore masculinity, violence, and vulnerability. A powerful collection that challenges traditional notions of strength and what it means to be human."),
    createBook(PoetryExpat, "Expat: Poetry of Displacement", "Poems of belonging and alienation, written from the space between cultures. A lyrical exploration of identity, home, and the courage it takes to leave everything behind."),
    createBook(PoetryFoster, "Foster: A Collection", "Heartbreaking and hopeful poems about foster care, temporary homes, and permanent scars. A testament to resilience and the human capacity to love despite loss."),
    createBook(PoetryMotherhood, "Motherhood Unfiltered", "Honest, humorous, and deeply moving poems about the realities of motherhood—the joy, exhaustion, fear, and fierce love that defies description."),
    createBook(PoetryPetal, "Petal by Petal", "Delicate verses inspired by nature and growth. Each poem blooms with imagery of flowers, seasons, and the cycles of life, death, and renewal."),
    createBook(PoetryRisingTide, "Rising Tide", "Powerful poems of social justice and activism. A call to action wrapped in beautiful language, demanding change while celebrating the resilience of the human spirit."),
    createBook(PoetryTears, "Tears Like Rain", "A collection of grief and healing, tracking one person's journey through loss to acceptance. Each poem a step toward wholeness, each verse a prayer for peace."),
    createBook(PoetryWolfWider, "The Wolf Grew Wider", "Dark, surreal poetry that explores fear, transformation, and the wildness within. Haunting verses that linger long after the last page."),
  ];

  const bookRows = [
    {
      title: "Recommended Books",
      books: [
        horrorBooks[0],
        romanceBooks[1],
        mysteryBooks[2],
        fantasyBooks[0],
        poetryBooks[0],
        horrorBooks[4],
        romanceBooks[6],
        fantasyBooks[4],
      ],
    },
    {
      title: "Fantasy",
      books: fantasyBooks,
    },
    {
      title: "Fiction",
      books: fictionBooks,
    },
    {
      title: "Romance",
      books: romanceBooks,
    },
    {
      title: "Mystery & Thriller",
      books: mysteryBooks,
    },
    {
      title: "Horror",
      books: horrorBooks,
    },
    {
      title: "Poetry",
      books: poetryBooks,
    },
  ];

  const handleBrowseGenres = () => {
    document.getElementById("genres-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      <NavBar
        user={user}
        isDarkMode={isDarkMode}
        showDropdown={showDropdown}
        showSearch={showSearch}
        searchQuery={searchQuery}
        availableGenres={availableGenres}
        filteredGenres={filteredGenres}
        onToggleTheme={toggleTheme}
        onToggleDropdown={toggleDropdown}
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

      {/* Content Rows */}
      <div className="content" id="genres-section">
        {bookRows.map((row, rowIndex) => (
          <div key={rowIndex} className="book-row">
            <h2 className="row-title">{row.title}</h2>
            <div className="books-container">
              <div className="books-track">
                {/* First set of books */}
                {row.books.map((book, bookIndex) => (
                  <div
                    key={`first-${bookIndex}`}
                    className="book-card"
                    onClick={() => openBookDetails(book)}
                  >
                    <img src={book.image} alt={book.title} />
                    <div className="book-overlay">
                      <div className="book-rating">⭐ {book.rating.toFixed(1)}</div>
                    </div>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {row.books.map((book, bookIndex) => (
                  <div
                    key={`second-${bookIndex}`}
                    className="book-card"
                    onClick={() => openBookDetails(book)}
                  >
                    <img src={book.image} alt={book.title} />
                    <div className="book-overlay">
                      <div className="book-rating">⭐ {book.rating.toFixed(1)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Signup Modal */}
      {showSignup && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModals}>
              ×
            </button>
            <h2 className="modal-title">Sign Up for Bookflix</h2>
            {authError && <div className="auth-error">{authError}</div>}
            <form className="auth-form" onSubmit={handleSignup}>
              <div className="form-group">
                <label htmlFor="signup-name">Full Name</label>
                <input
                  type="text"
                  id="signup-name"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-email">Email</label>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  placeholder="Create a password"
                  minLength={6}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-confirm">Confirm Password</label>
                <input
                  type="password"
                  id="signup-confirm"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  minLength={6}
                  required
                />
              </div>
              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
            <p className="auth-switch">
              Already have an account?{" "}
              <button onClick={openLogin} className="switch-link">
                Login
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModals}>
              ×
            </button>
            <h2 className="modal-title">Login to Bookflix</h2>
            {authError && <div className="auth-error">{authError}</div>}
            <form className="auth-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="login-email">Email</label>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="forgot-password">
                  Forgot password?
                </button>
              </div>
              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="auth-switch">
              Don't have an account?{" "}
              <button onClick={openSignup} className="switch-link">
                Sign Up
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Book Details Modal */}
      {selectedBook && (
        <div className="modal-overlay" onClick={closeBookDetails}>
          <div
            className="modal-content book-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeBookDetails}>
              ×
            </button>
            <div className="book-details-content">
              <div className="book-details-image">
                <img src={selectedBook.image} alt={selectedBook.title} />
              </div>
              <div className="book-details-info">
                <h2 className="book-details-title">{selectedBook.title}</h2>
                <div className="book-details-rating">
                  <span className="rating-stars">
                    {"⭐".repeat(Math.floor(selectedBook.rating))}
                    {selectedBook.rating % 1 >= 0.5 ? "⭐" : ""}
                  </span>
                  <span className="rating-number">
                    {selectedBook.rating.toFixed(1)} / 5.0
                  </span>
                </div>
                <div className="book-details-section">
                  <h3>Prologue</h3>
                  <p className="book-prologue">{selectedBook.prologue}</p>
                </div>
                <div className="book-details-actions">
                  <button
                    className="action-button primary"
                    onClick={() => addToWishlist(selectedBook)}
                    disabled={user && isInWishlist(selectedBook.title)}
                  >
                    {user && isInWishlist(selectedBook.title)
                      ? "Already in Wishlist"
                      : "Add to Wishlist"}
                  </button>
                  <button className="action-button secondary" onClick={openSignup}>
                    Start Reading
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Page */}
      {showProfile && user && (
        <div className="profile-overlay">
          <div className="profile-container">
            <button className="profile-close" onClick={() => setShowProfile(false)}>
              ×
            </button>
            <div className="profile-header">
              <div className="profile-avatar">👤</div>
              <div className="profile-info">
                <h2 className="profile-name">
                  {user.user_metadata?.full_name || "User"}
                </h2>
                <p className="profile-email">{user.email}</p>
              </div>
            </div>

            <div className="profile-section">
              <h3 className="profile-section-title">
                My Wishlist ({wishlist.length} books)
              </h3>
              {wishlist.length === 0 ? (
                <p className="empty-wishlist">
                  Your wishlist is empty. Start adding books!
                </p>
              ) : (
                <div className="wishlist-grid">
                  {wishlist.map((book, index) => (
                    <div key={index} className="wishlist-card">
                      <div className="wishlist-card-image">
                        <img src={book.image} alt={book.title} />
                      </div>
                      <div className="wishlist-card-info">
                        <h4 className="wishlist-card-title">{book.title}</h4>
                        <div className="wishlist-card-rating">
                          ⭐ {book.rating.toFixed(1)}
                        </div>
                        <p className="wishlist-card-prologue">
                          {book.prologue.substring(0, 100)}...
                        </p>
                        <div className="wishlist-card-actions">
                          <button
                            onClick={() => openBookDetails(book)}
                            className="wishlist-btn view"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => removeFromWishlist(book.title)}
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
      )}

      <Footer />
    </div>
  );
}

export default App;
