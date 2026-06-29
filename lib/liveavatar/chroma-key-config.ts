export type ChromaKeyOptions = {
  minHue: number;
  maxHue: number;
  minSaturation: number;
  threshold: number;
  /** Soft-edge aggressiveness — higher removes more green halo (official demo uses 4). */
  edgeStrength: number;
  /** Reduce green spill on keyed subject pixels. */
  despill: boolean;
};

/** Defaults from LiveAvatar bg-removal-demo, tuned slightly for hair edges and spill. */
export const EDEN_CHROMA_KEY_OPTIONS: ChromaKeyOptions = {
  minHue: 60,
  maxHue: 165,
  minSaturation: 0.1,
  threshold: 1.0,
  edgeStrength: 6,
  despill: true,
};
