import { z } from "zod";

/**
 * Validation schema for creating a word
 */
export const createWordSchema = z.object({
  word: z.string().min(1).max(100),

  language: z.string().optional(),

  pronunciation: z
    .object({
      ipa: z.string().optional(),
      audio: z.string().url().optional(),
    })
    .optional(),

  syllables: z.array(z.string()).optional(),

  frequency: z.number().optional(),

  level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]).optional(),

  origin: z.string().optional(),

  definitions: z.array(
    z.object({
      meaning: z.string().min(1),

      partOfSpeech: z.enum([
        "noun",
        "verb",
        "adjective",
        "adverb",
        "pronoun",
        "preposition",
        "conjunction",
        "interjection",
        "determiner",
      ]),

      grammar: z
        .object({
          transitive: z.boolean().optional(),
          irregular: z.boolean().optional(),
        })
        .optional(),

      examples: z
        .array(
          z.object({
            sentence: z.string(),
            translation: z.string().optional(),
            source: z.string().optional(),
          }),
        )
        .optional(),

      synonyms: z.array(z.string()).optional(),
      antonyms: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
      notes: z.string().optional(),
    }),
  ),
});
