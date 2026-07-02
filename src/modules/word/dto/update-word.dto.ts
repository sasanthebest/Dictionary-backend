import { z } from "zod";

/**
 * Partial update validation
 */
export const updateWordSchema = z.object({
  word: z.string().min(1).max(100).optional(),

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

  definitions: z
    .array(
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
      }),
    )
    .optional(),
});
