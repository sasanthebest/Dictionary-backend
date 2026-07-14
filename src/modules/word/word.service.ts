import * as wordRepo from "./word.repository";
import { buildWordQuery } from "./word.query";
import * as repo from "./word.repository";
import { getSimilarity } from "../../utils/fuzzySearch";
import { Word } from "../../models/word.model";
import { CreateWordInput } from "./word.types";
/**
 * Create word business logic
 */
export const createWord = async (data: CreateWordInput) => {
  // Check if word already exists
  const exists = await Word.exists({
    normalizedWord: data.normalizedWord,
  });

  if (exists) {
    return {
      success: false,
      error: "This word already exists",
    };
  }

  const word = await wordRepo.createWord(data);

  return {
    success: true,
    data: word,
  };
};

/**
 * Get word by id
 */
export const getWordById = async (id: string) => {
  const word = await wordRepo.getWordById(id);

  if (!word) {
    return {
      success: false,
      message: "Word not found",
    };
  }

  return {
    success: true,
    data: word,
  };
};

/**
 * Search words
 */
export const searchWords = async (query: string) => {
  const words = await wordRepo.searchWords(query);

  return {
    success: true,
    count: words.length,
    data: words,
  };
};

/**
 * Update word
 */
export const updateWord = async (id: string, data: any) => {
  const word = await wordRepo.updateWord(id, data);

  if (!word) {
    return {
      success: false,
      message: "Word not found",
    };
  }

  return {
    success: true,
    data: word,
  };
};

/**
 * Delete word
 */
export const deleteWord = async (id: string) => {
  const word = await wordRepo.deleteWord(id);

  if (!word) {
    return {
      success: false,
      message: "Word not found",
    };
  }

  return {
    success: true,
    message: "Word deleted successfully",
  };
};

/**
 * get word
 */
export const getWords = async (params: any) => {
  const { query, pagination, sort } = buildWordQuery(params);

  const [data, total] = await Promise.all([
    repo.findWords(query, pagination.skip, pagination.limit, sort),
    repo.countWords(query),
  ]);

  return {
    success: true,
    data,
    pagination: {
      total,
      page: Number(params.page || 1),
      limit: Number(params.limit || 20),
      pages: Math.ceil(total / Number(params.limit || 20)),
    },
  };
};

/**
 * Fuzzy search words (typo tolerant)
 */
export const fuzzySearchWords = async (query: string) => {
  const words = await repo.getAllWords();

  const scored = words
    .map((word) => {
      const score = getSimilarity(query, word.word);

      return {
        word,
        score,
      };
    })
    .filter((item) => item.score > 0.4) // threshold (tune later)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return {
    success: true,
    query,
    results: scored.map((s) => s.word),
  };
};

/**
 * Autocomplete service
 */
export const autocompleteWords = async (query: string) => {
  if (!query) {
    return {
      success: true,
      data: [],
    };
  }

  const results = await repo.autocompleteWords(query);

  return {
    success: true,
    query,
    data: results,
  };
};
