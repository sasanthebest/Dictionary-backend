import { z } from "zod";
import { LANGUAGE_LEVELS, PART_OF_SPEECH } from "../word.constants";

export const partOfSpeechSchema = z.enum(PART_OF_SPEECH);

export const languageLevelSchema = z.enum(LANGUAGE_LEVELS);

export const exampleSchema = z.object({
  sentence: z.string(),

  translation: z.string().optional(),

  source: z.string().optional(),
});

export const grammarSchema = z.object({
  transitive: z.boolean().optional(),

  irregular: z.boolean().optional(),
});

export const pronunciationSchema = z.object({
  ipa: z.string().optional(),

  audio: z.string().optional(),
});

export const definitionSchema = z.object({
  meaning: z.string().min(1),

  partOfSpeech: partOfSpeechSchema,

  grammar: grammarSchema.optional(),

  examples: z.array(exampleSchema).default([]),

  synonyms: z.array(z.string()).default([]),

  antonyms: z.array(z.string()).default([]),

  tags: z.array(z.string()).default([]),

  notes: z.string().optional(),
});

export const createWordSchema = z.object({
  word: z.string().min(1).max(100),
  userId: z.string().optional(),

  normalizedWord: z.string().min(1).max(100),

  language: z.string().default("en"),

  pronunciation: pronunciationSchema.optional(),

  syllables: z.array(z.string()).default([]),

  frequency: z.number().optional(),

  level: languageLevelSchema.optional(),

  origin: z.string().optional(),

  definitions: z.array(definitionSchema).default([]),
});
