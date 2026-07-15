import { redis } from "../../config/redis";
import { Word } from "../../models/word.model";
import { WORD_MAX_AGE } from "../../settings";
/**
 * Create a new word in DB
 */
export const createWord = (data: any) => {
  return Word.create(data);
};

/**
 * Get word by ID with cache
 */
export const getWordById = async (id: string) => {
  const cacheKey = `word:${id}`;

  // 1. check cache
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // 2. DB fetch
  const word = await Word.findById(id);

  if (word) {
    await redis.set(cacheKey, JSON.stringify(word), {
      PX: WORD_MAX_AGE,
    });
  }

  return word;
};

/**
 * Search words by text
 */
export const searchWords = async (query: string) => {
  const cacheKey = `search:${query}`;

  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const results = await Word.find({
    normalizedWord: { $regex: query.toLowerCase(), $options: "i" },
  }).limit(20);

  await redis.set(cacheKey, JSON.stringify(results), {
    EX: 60 * 5,
  });

  return results;
};

/**
 * Update word
 */

export const updateWord = async (id: string, data: any) => {
  const word = await Word.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  // invalidate cache
  await redis.del(`word:${id}`);

  return word;
};

/**
 * Delete word
 */
export const deleteWord = async (id: string) => {
  const word = await Word.findByIdAndDelete(id);

  await redis.del(`word:${id}`);

  return word;
};

/**
 * filter word
 */
export const findWords = (
  query: any,
  skip: number,
  limit: number,
  sort: any,
) => {
  return Word.find(query).sort(sort).skip(skip).limit(limit);
};

export const countWords = (query: any) => {
  return Word.countDocuments(query);
};

/**
 * Get all words (for fuzzy ranking)
 */
export const getAllWords = () => {
  return Word.find({});
};

/**
 * Prefix search for autocomplete
 */
export const autocompleteWords = async (query: string) => {
  const cacheKey = `autocomplete:${query}`;

  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const results = await Word.find({
    normalizedWord: {
      $regex: "^" + query.toLowerCase(),
    },
  })
    .limit(10)
    .select("word normalizedWord");

  await redis.set(cacheKey, JSON.stringify(results), {
    EX: 60 * 10, // 10 minutes
  });

  return results;
};
