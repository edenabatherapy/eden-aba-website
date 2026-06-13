export type HeroEmojiAnimation =
  | "grow"
  | "learn"
  | "smile"
  | "thrive"
  | "play"
  | "shine"
  | "explore"
  | "connect"
  | "discover"
  | "imagine"
  | "build"
  | "achieve"
  | "blossom";

export type HeroWordEmojiConfig = {
  emoji: string;
  animation: HeroEmojiAnimation;
  label: string;
};

const WORD_CONFIG: Record<string, HeroWordEmojiConfig> = {
  grow: { emoji: "🌱", animation: "grow", label: "growth" },
  learn: { emoji: "📚", animation: "learn", label: "learning" },
  smile: { emoji: "☀️", animation: "smile", label: "happiness" },
  thrive: { emoji: "✨", animation: "thrive", label: "thriving" },
  blossom: { emoji: "🌸", animation: "blossom", label: "blossoming" },
  communicate: { emoji: "💬", animation: "connect", label: "communication" },
  connect: { emoji: "🤝", animation: "connect", label: "connection" },
  play: { emoji: "🧸", animation: "play", label: "play" },
  shine: { emoji: "🌟", animation: "shine", label: "shining" },
  explore: { emoji: "🚀", animation: "explore", label: "exploration" },
  discover: { emoji: "🔍", animation: "discover", label: "discovery" },
  imagine: { emoji: "🎨", animation: "imagine", label: "imagination" },
  build: { emoji: "🧩", animation: "build", label: "building" },
  achieve: { emoji: "🏆", animation: "achieve", label: "achievement" },
};

const VI_WORD_ALIASES: Record<string, keyof typeof WORD_CONFIG> = {
  "lớn lên": "grow",
  "học hỏi": "learn",
  "thăng hoa": "thrive",
  "nở rộ": "blossom",
  "giao tiếp": "communicate",
  "kết nối": "connect",
  "mỉm cười": "smile",
};

const DEFAULT_CONFIG = WORD_CONFIG.smile;

export function getHeroWordEmojiConfig(word: string): HeroWordEmojiConfig {
  const normalized = word.trim().toLowerCase();
  const viKey = VI_WORD_ALIASES[word.trim().toLowerCase()];
  if (viKey && WORD_CONFIG[viKey]) return WORD_CONFIG[viKey];
  return WORD_CONFIG[normalized] ?? DEFAULT_CONFIG;
}
