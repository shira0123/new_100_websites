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
import ExpenseTracker from "./_sites/ExpenseTracker";
import BudgetPlanner from "./_sites/BudgetPlanner";
import DiceRoller from "./_sites/DiceRoller";
import TarotCard from "./_sites/TarotCard";
import NumberGuesser from "./_sites/NumberGuesser";

// ── Batch 4 (51–65) ──────────────────────────────
import CssAnimationPlayground from "./_sites/CssAnimationPlayground";
import PixelRuler from "./_sites/PixelRuler";
import AspectRatioCalculator from "./_sites/AspectRatioCalculator";
import BorderRadiusPreview from "./_sites/BorderRadiusPreview";
import EmojiPicker from "./_sites/EmojiPicker";
import IconFinder from "./_sites/IconFinder";
import RgbMixer from "./_sites/RgbMixer";
import GratitudeJournal from "./_sites/GratitudeJournal";
import KeyboardShortcutRef from "./_sites/KeyboardShortcutRef";
import FlashcardMaker from "./_sites/FlashcardMaker";
import SvgWaveGenerator from "./_sites/SvgWaveGenerator";

// ── Batch 5 (Dynamic 66+) ────────────────────────
import WeatherApp from "./_sites/WeatherApp";
import NewsAggregator from "./_sites/NewsAggregator";
import GithubProfileViewer from "./_sites/GithubProfileViewer";
import CryptoTracker from "./_sites/CryptoTracker";
import CountryExplorer from "./_sites/CountryExplorer";
import DictionaryApp from "./_sites/DictionaryApp";
import JokeGenerator from "./_sites/JokeGenerator";

import ComingSoon from "./_sites/ComingSoon";

export function generateStaticParams() {
  return sites.map((s) => ({ slug: s.slug }));
}

const SITE_MAP = {
  // Batch 1
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
  // Batch 2
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
  "regex-tester":                RegexTester,
  "css-box-shadow-generator":    BoxShadowGenerator,
  "breathing-exercise":          BreathingExercise,
  "digital-clock":               DigitalClock,
  "world-clock":                 WorldClock,
  "morse-code-translator":       MorseCodeTranslator,
  "binary-converter":            BinaryConverter,
  // Batch 3
  "todo-list":                   TodoList,
  "note-taking-app":             NoteTakingApp,
  "habit-tracker":               HabitTracker,
  "flashcard-maker":             ComingSoon,
  "typing-speed-test":           TypingSpeedTest,
  "snake-game":                  SnakeGame,
  "tic-tac-toe":                 TicTacToe,
  "memory-card-game":            MemoryCardGame,
  "rock-paper-scissors":         RockPaperScissors,
  "word-scramble":               WordScramble,
  "quiz-app":                    QuizApp,
  "scientific-calculator":       ScientificCalculator,
  "loan-calculator":             LoanCalculator,
  "currency-converter":          CurrencyConverterStatic,
  "calorie-counter":             CalorieCounter,
  "water-intake-tracker":        WaterIntakeTracker,
  "expense-tracker":             ExpenseTracker,
  "budget-planner":              BudgetPlanner,
  "dice-roller":                 DiceRoller,
  "daily-tarot-card":            TarotCard,
  "number-guesser":              NumberGuesser,
  // Batch 4
  "css-animation-playground":    CssAnimationPlayground,
  "pixel-ruler":                 PixelRuler,
  "aspect-ratio-calculator":     AspectRatioCalculator,
  "border-radius-preview":       BorderRadiusPreview,
  "emoji-picker":                EmojiPicker,
  "icon-finder":                 IconFinder,
  "rgb-mixer":                   RgbMixer,
  "gratitude-journal":           GratitudeJournal,
  "keyboard-shortcut-ref":       KeyboardShortcutRef,
  "flashcard-maker":             FlashcardMaker,
  "svg-wave-generator":          SvgWaveGenerator,
  // Batch 5 (Dynamic)
  "weather-app":                 WeatherApp,
  "news-aggregator":             NewsAggregator,
  "github-profile-viewer":       GithubProfileViewer,
  "crypto-tracker":              CryptoTracker,
  "country-explorer":            CountryExplorer,
  "dictionary-app":              DictionaryApp,
  "joke-generator":              JokeGenerator,
};

export default async function SitePage({ params }) {
  const { slug } = await params;
  const site = getSiteBySlug(slug);
  if (!site) notFound();

  const Component = SITE_MAP[slug] || ComingSoon;
  return <Component site={site} />;
}
