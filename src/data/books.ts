import type { Book, BookRow } from "../types/book";

import Book1 from "../assets/MysteryAndThriller/Book1.jpg";

// Fiction book covers
import FictionBeautifulLies from "../assets/Fiction/BeautifulLies.jpg";
import FictionBloodMark from "../assets/Fiction/BloodMark.webp";
import FictionDeadEyes from "../assets/Fiction/DeadEyes.webp";
import FictionGermanGirl from "../assets/Fiction/GermanGirl.jpg";
import FictionMaltese from "../assets/Fiction/Maltese.jpg";
import FictionOcean from "../assets/Fiction/Ocean.jpg";
import FictionRelic from "../assets/Fiction/Relic.png";
import FictionSoul from "../assets/Fiction/Soul.jpg";

// Horror book covers
import HorrorColdDresses from "../assets/Horror/ColdDresses.jpg";
import Horror1 from "../assets/Horror/Horror1.webp";
import HorrorNightmare from "../assets/Horror/Nightmare.jpg";
import HorrorTheGhost from "../assets/Horror/TheGhost.jpg";
import HorrorTheNight from "../assets/Horror/TheNight.jpg";
import HorrorVirginia from "../assets/Horror/Virginia.jpg";
import HorrorWhenDarkness from "../assets/Horror/WhenDarkness.webp";

// Romance book covers
import RomanceDukeBaby from "../assets/Romance/DukeBaby.jpg";
import RomanceFirstLove from "../assets/Romance/FirstLove.jpg";
import RomanceFirstLove2 from "../assets/Romance/FirstLove2.jpg";
import RomanceLegacyLove from "../assets/Romance/LegacyLove.jpg";
import RomanceSilverFate from "../assets/Romance/SilverFate.avif";
import RomanceSleepingWith from "../assets/Romance/SleepingWith.jpeg";
import RomanceSoulmate from "../assets/Romance/Soulmate.jpg";

// Mystery & Thriller book covers
import MysteryGoodSister from "../assets/MysteryAndThriller/GoodSister.jpg";
import MysteryHarryPotter from "../assets/MysteryAndThriller/HarryPotter.png";
import MysteryPastRising from "../assets/MysteryAndThriller/PastRising.jpg";
import MysteryPineHouse from "../assets/MysteryAndThriller/PineHouse.png";
import MysterySpace from "../assets/MysteryAndThriller/Space.webp";
import MysteryTakeMeBack from "../assets/MysteryAndThriller/TakeMeBack.webp";
import MysteryWeFall from "../assets/MysteryAndThriller/WeFall.png";

// Fantasy book covers
import FantasyEmbers from "../assets/Fantasy/Embers.jpg";
import FantasyEternityGate from "../assets/Fantasy/EternityGate.webp";
import FantasyHarryPotter from "../assets/Fantasy/HarryPotter.png";
import FantasyHiddenInFrost from "../assets/Fantasy/HiddenInFrost.jpg";
import FantasyPrinceAndWitch from "../assets/Fantasy/PrinceAndWitch.jpg";
import FantasySilverPromise from "../assets/Fantasy/SilverPromise.webp";
import FantasyTempest from "../assets/Fantasy/Tempest.jpeg";

// Poetry book covers
import PoetryBrute from "../assets/Poetry/Brute.jpg";
import PoetryExpat from "../assets/Poetry/Expat.jpeg";
import PoetryFoster from "../assets/Poetry/Foster.jpg";
import PoetryMotherhood from "../assets/Poetry/Motherhood.jpg";
import PoetryPetal from "../assets/Poetry/Petal.jpg";
import PoetryRisingTide from "../assets/Poetry/RisingTide.jpg";
import PoetryTears from "../assets/Poetry/Tears.jpg";
import PoetryWolfWider from "../assets/Poetry/WolfWider.jpg";

// Helper function to create book objects with random ratings
const createBook = (image: string, title: string, prologue: string): Book => ({
  image,
  title,
  prologue,
  rating: Math.floor(Math.random() * 16) / 10 + 3.5, // Random rating between 3.5 and 5.0
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

export const bookRows: BookRow[] = [
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

export const genres = bookRows.map((row) => row.title);

// Every genre shelf, without the mixed "Recommended" row
export const genreRows = bookRows.filter((row) => row.title !== "Recommended Books");

export const allBooks = genreRows.flatMap((row) => row.books);
