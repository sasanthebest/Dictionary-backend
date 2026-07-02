import levenshtein from "fast-levenshtein";

/**
 * Calculate similarity score between two words
 * Lower distance = more similar
 */
export const getSimilarity = (a: string, b: string) => {
  const distance = levenshtein.get(a.toLowerCase(), b.toLowerCase());

  // normalize score (0 → best match)
  return 1 - distance / Math.max(a.length, b.length);
};
