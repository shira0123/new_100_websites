import { getSiteBySlug, sites } from "../../_data/sites";
import { notFound } from "next/navigation";

// ── Batch 1 (1–10) ───────────────────────────────
import ColorPaletteGenerator from "./_sites/ColorPaletteGenerator";
import CssGradientMaker from "./_sites/CssGradientMaker";
import UnitConverter from "./_sites/UnitConverter";
import CountdownTimer from "./_sites/CountdownTimer";
import PomodoroClockSite from "./_sites/PomodoroClock";
import MarkdownPreviewer from "./_sites/MarkdownPreviewer";
import PasswordGenerator from "./_sites/PasswordGenerator";
import BmiCalculator from "./_sites/BmiCalculator";
import TipCalculator from "./_sites/TipCalculator";
import AgeCalculator from "./_sites/AgeCalculator";

// ── Batch 2 (11–30) ──────────────────────────────
import RandomQuote from "./_sites/RandomQuote";
import LoremIpsumGenerator from "./_sites/LoremIpsumGenerator";
import CharacterCounter from "./_sites/CharacterCounter";
import Base64EncoderDecoder from "./_sites/Base64EncoderDecoder";
import JsonFormatter from "./_sites/JsonFormatter";
import HexRgbConverter from "./_sites/HexRgbConverter";
import Stopwatch from "./_sites/Stopwatch";
import QrCodeGenerator from "./_sites/QrCodeGenerator";
import TextCaseConverter from "./_sites/TextCaseConverter";
import NumberToWords from "./_sites/NumberToWords";
import RomanNumeralConverter from "./_sites/RomanNumeralConverter";
import RegexTester from "./_sites/RegexTester";
import BoxShadowGenerator from "./_sites/BoxShadowGenerator";
import BreathingExercise from "./_sites/BreathingExercise";
import DigitalClock from "./_sites/DigitalClock";
import WorldClock from "./_sites/WorldClock";
import MorseCodeTranslator from "./_sites/MorseCodeTranslator";
import BinaryConverter from "./_sites/BinaryConverter";

// ── Batch 3 (31–50) ──────────────────────────────
import TodoList from "./_sites/TodoList";
import NoteTakingApp from "./_sites/NoteTakingApp";
import HabitTracker from "./_sites/HabitTracker";
import FlashcardMaker from "./_sites/FlashcardMaker";
import TypingSpeedTest from "./_sites/TypingSpeedTest";
import SnakeGame from "./_sites/SnakeGame";
import TicTacToe from "./_sites/TicTacToe";
import MemoryCardGame from "./_sites/MemoryCardGame";
import RockPaperScissors from "./_sites/RockPaperScissors";
import WordScramble from "./_sites/WordScramble";
import QuizApp from "./_sites/QuizApp";
import ScientificCalculator from "./_sites/ScientificCalculator";
import LoanCalculator from "./_sites/LoanCalculator";
import CurrencyConverterStatic from "./_sites/CurrencyConverterStatic";
import CalorieCounter from "./_sites/CalorieCounter";
import WaterIntakeTracker from "./_sites/WaterIntakeTracker";
import PortfolioTemplate from "./_sites/PortfolioTemplate";
import ResumeBuilder from "./_sites/ResumeBuilder";
import InvoiceGenerator from "./_sites/InvoiceGenerator";
import ColorBlindnessChecker from "./_sites/ColorBlindnessChecker";

// ── Batch 4 (51–65) ──────────────────────────────
import FontPairingTool from "./_sites/FontPairingTool";
import BorderRadiusPreview from "./_sites/BorderRadiusPreview";
import SvgWaveGenerator from "./_sites/SvgWaveGenerator";
import EmojiPicker from "./_sites/EmojiPicker";
import IconFinder from "./_sites/IconFinder";
import RgbMixer from "./_sites/RgbMixer";
import BudgetPlanner from "./_sites/BudgetPlanner";
import NumberGuesser from "./_sites/NumberGuesser";
import DiceRoller from "./_sites/DiceRoller";
import TarotCard from "./_sites/TarotCard";
import GratitudeJournal from "./_sites/GratitudeJournal";
import VisionBoard from "./_sites/VisionBoard";
import ExpenseTracker from "./_sites/ExpenseTracker";
import KeyboardShortcutRef from "./_sites/KeyboardShortcutRef";
import CssAnimationPlayground from "./_sites/CssAnimationPlayground";
import PixelRuler from "./_sites/PixelRuler";
import AspectRatioCalculator from "./_sites/AspectRatioCalculator";

// ── Batch 5 (Dynamic 66–100) ─────────────────────
import WeatherApp from "./_sites/WeatherApp";
import NewsAggregator from "./_sites/NewsAggregator";
import GithubProfileViewer from "./_sites/GithubProfileViewer";
import CryptoTracker from "./_sites/CryptoTracker";
import MovieSearch from "./_sites/MovieSearch";
import RecipeFinder from "./_sites/RecipeFinder";
import CountryExplorer from "./_sites/CountryExplorer";
import DictionaryApp from "./_sites/DictionaryApp";
import JokeGenerator from "./_sites/JokeGenerator";
import DogBreedExplorer from "./_sites/DogBreedExplorer";
import NasaApod from "./_sites/NasaApod";
import BookSearch from "./_sites/BookSearch";
import PokemonExplorer from "./_sites/PokemonExplorer";
import IpLookup from "./_sites/IpLookup";
import MemeGenerator from "./_sites/MemeGenerator";
import TriviaGame from "./_sites/TriviaGame";
import StockTicker from "./_sites/StockTicker";
import ArtGallery from "./_sites/ArtGallery";
import SpaceMissions from "./_sites/SpaceMissions";
import LanguageTranslator from "./_sites/LanguageTranslator";
import MusicExplorer from "./_sites/MusicExplorer";
import CocktailFinder from "./_sites/CocktailFinder";
import ExerciseLibrary from "./_sites/ExerciseLibrary";
import AnimeSearch from "./_sites/AnimeSearch";
import GithubTrending from "./_sites/GithubTrending";
import ColorNameFinder from "./_sites/ColorNameFinder";
import AdviceGenerator from "./_sites/AdviceGenerator";
import CatFacts from "./_sites/CatFacts";
import UsHolidays from "./_sites/UsHolidays";
import ZipCodeLookup from "./_sites/ZipCodeLookup";
import IssTracker from "./_sites/IssTracker";
import AgeInSeconds from "./_sites/AgeInSeconds";
import MotivationalSpeech from "./_sites/MotivationalSpeech";
import CovidStats from "./_sites/CovidStats";
import WikipediaSearch from "./_sites/WikipediaSearch";

import ComingSoon from "./_sites/ComingSoon";

export function generateStaticParams() {
  return sites.map((s) => ({ slug: s.slug }));
}

// All 100 slugs → components (matches sites.js exactly)
const SITE_MAP = {
  // Static 1–65
  "color-palette-generator":     ColorPaletteGenerator,
  "css-gradient-maker":          CssGradientMaker,
  "unit-converter":              UnitConverter,
  "countdown-timer":             CountdownTimer,
  "pomodoro-clock":              PomodoroClockSite,
  "markdown-previewer":          MarkdownPreviewer,
  "password-generator":          PasswordGenerator,
  "bmi-calculator":              BmiCalculator,
  "tip-calculator":              TipCalculator,
  "age-calculator":              AgeCalculator,
  "random-quote":                RandomQuote,
  "lorem-ipsum-generator":       LoremIpsumGenerator,
  "character-counter":           CharacterCounter,
  "base64-encoder":              Base64EncoderDecoder,
  "json-formatter":              JsonFormatter,
  "hex-rgb-converter":           HexRgbConverter,
  "stopwatch":                   Stopwatch,
  "qr-code-generator":           QrCodeGenerator,
  "text-case-converter":         TextCaseConverter,
  "number-to-words":             NumberToWords,
  "roman-numeral-converter":     RomanNumeralConverter,
  "pixel-ruler":                 PixelRuler,
  "aspect-ratio-calculator":     AspectRatioCalculator,
  "regex-tester":                RegexTester,
  "css-box-shadow-generator":    BoxShadowGenerator,
  "breathing-exercise":          BreathingExercise,
  "digital-clock":               DigitalClock,
  "world-clock":                 WorldClock,
  "morse-code-translator":       MorseCodeTranslator,
  "binary-converter":            BinaryConverter,
  "todo-list":                   TodoList,
  "note-taking-app":             NoteTakingApp,
  "habit-tracker":               HabitTracker,
  "flashcard-maker":             FlashcardMaker,
  "typing-speed-test":           TypingSpeedTest,
  "snake-game":                  SnakeGame,
  "tic-tac-toe":                 TicTacToe,
  "memory-card-game":            MemoryCardGame,
  "rock-paper-scissors":         RockPaperScissors,
  "word-scramble":               WordScramble,
  "quiz-app":                    QuizApp,
  "calculator":                  ScientificCalculator,
  "loan-calculator":             LoanCalculator,
  "currency-converter-static":   CurrencyConverterStatic,
  "calorie-counter":             CalorieCounter,
  "water-intake-tracker":        WaterIntakeTracker,
  "portfolio-template":          PortfolioTemplate,
  "resume-builder":              ResumeBuilder,
  "invoice-generator":           InvoiceGenerator,
  "color-blindness-checker":     ColorBlindnessChecker,
  "font-pairing-tool":           FontPairingTool,
  "border-radius-preview":       BorderRadiusPreview,
  "svg-wave-generator":          SvgWaveGenerator,
  "emoji-picker":                EmojiPicker,
  "icon-finder":                 IconFinder,
  "rgb-mixer":                   RgbMixer,
  "budget-planner":              BudgetPlanner,
  "number-guesser":              NumberGuesser,
  "dice-roller":                 DiceRoller,
  "tarot-card":                  TarotCard,
  "gratitude-journal":           GratitudeJournal,
  "motivation-board":            VisionBoard,
  "expense-tracker":             ExpenseTracker,
  "keyboard-shortcut-ref":       KeyboardShortcutRef,
  "css-animation-playground":    CssAnimationPlayground,
  // Dynamic 66–100
  "weather-app":                 WeatherApp,
  "news-aggregator":             NewsAggregator,
  "github-profile-viewer":       GithubProfileViewer,
  "crypto-tracker":              CryptoTracker,
  "movie-search":                MovieSearch,
  "recipe-finder":               RecipeFinder,
  "country-explorer":            CountryExplorer,
  "dictionary-app":              DictionaryApp,
  "joke-generator":              JokeGenerator,
  "dog-breed-explorer":          DogBreedExplorer,
  "nasa-apod":                   NasaApod,
  "open-library-search":         BookSearch,
  "pokemon-explorer":            PokemonExplorer,
  "ip-lookup":                   IpLookup,
  "meme-generator":              MemeGenerator,
  "trivia-game":                 TriviaGame,
  "stock-ticker":                StockTicker,
  "art-gallery":                 ArtGallery,
  "space-missions":              SpaceMissions,
  "language-translator":         LanguageTranslator,
  "music-explorer":              MusicExplorer,
  "cocktail-finder":             CocktailFinder,
  "exercise-library":            ExerciseLibrary,
  "anime-search":                AnimeSearch,
  "github-trending":             GithubTrending,
  "color-name-finder":           ColorNameFinder,
  "advice-generator":            AdviceGenerator,
  "cat-facts":                   CatFacts,
  "us-holidays":                 UsHolidays,
  "zip-code-lookup":             ZipCodeLookup,
  "iss-tracker":                 IssTracker,
  "age-in-seconds":              AgeInSeconds,
  "motivational-speech":         MotivationalSpeech,
  "covid-stats":                 CovidStats,
  "wikipedia-search":            WikipediaSearch,
};

export default async function SitePage({ params }) {
  const { slug } = await params;
  const site = getSiteBySlug(slug);
  if (!site) notFound();

  const Component = SITE_MAP[slug] || ComingSoon;
  return <Component site={site} />;
}
