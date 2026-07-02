import mongoose, { Document, Schema, Model } from "mongoose";

/* ============================================================================
 * ENUMS
 * ==========================================================================*/

/**
 * Supported parts of speech.
 */
export enum PartOfSpeech {
  NOUN = "noun",
  VERB = "verb",
  ADJECTIVE = "adjective",
  ADVERB = "adverb",
  PRONOUN = "pronoun",
  PREPOSITION = "preposition",
  CONJUNCTION = "conjunction",
  INTERJECTION = "interjection",
  DETERMINER = "determiner",
}

/**
 * Common English proficiency levels (CEFR).
 */
export enum LanguageLevel {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
}

/* ============================================================================
 * TYPESCRIPT INTERFACES
 * ==========================================================================*/

/**
 * Example sentence demonstrating a definition.
 */
export interface IExample {
  /**
   * Example sentence.
   *
   * Example:
   * "She runs every morning."
   */
  sentence: string;

  /**
   * Translation of the example sentence.
   */
  translation?: string;

  /**
   * Source of the example.
   *
   * Example:
   * Oxford
   * Cambridge
   * User
   */
  source?: string;
}

/**
 * Additional grammar information.
 */
export interface IGrammar {
  /**
   * Whether the verb is transitive.
   */
  transitive?: boolean;

  /**
   * Whether the verb is irregular.
   */
  irregular?: boolean;
}

/**
 * Pronunciation information.
 */
export interface IPronunciation {
  /**
   * IPA pronunciation.
   *
   * Example:
   * /rʌn/
   */
  ipa?: string;

  /**
   * Audio pronunciation URL.
   */
  audio?: string;
}

/**
 * A single meaning of a word.
 *
 * One word can contain multiple definitions.
 */
export interface IDefinition {
  /**
   * The actual meaning.
   */
  meaning: string;

  /**
   * Part of speech.
   */
  partOfSpeech: PartOfSpeech;

  /**
   * Grammar information.
   */
  grammar?: IGrammar;

  /**
   * Example sentences.
   */
  examples: IExample[];

  /**
   * Similar words.
   */
  synonyms: string[];

  /**
   * Opposite words.
   */
  antonyms: string[];

  /**
   * Additional explanation.
   */
  notes?: string;

  /**
   * Optional tags.
   *
   * Example:
   * formal
   * slang
   * business
   * academic
   */
  tags: string[];
}

/**
 * Dictionary word.
 */
export interface IWord extends Document {
  /**
   * Original word.
   */
  word: string;

  /**
   * Lowercase version used for searching.
   */
  normalizedWord: string;

  /**
   * Language code.
   *
   * Example:
   * en
   * fa
   */
  language: string;

  /**
   * Pronunciation information.
   */
  pronunciation?: IPronunciation;

  /**
   * Word syllables.
   */
  syllables: string[];

  /**
   * Word popularity/frequency.
   */
  frequency?: number;

  /**
   * CEFR language level.
   */
  level?: LanguageLevel;

  /**
   * Etymology.
   */
  origin?: string;

  /**
   * Multiple definitions.
   */
  definitions: IDefinition[];

  createdAt: Date;
  updatedAt: Date;
}

/* ============================================================================
 * SCHEMAS
 * ==========================================================================*/

const ExampleSchema = new Schema<IExample>(
  {
    sentence: {
      type: String,
      required: true,
      trim: true,
    },

    translation: {
      type: String,
      trim: true,
    },

    source: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const GrammarSchema = new Schema<IGrammar>(
  {
    transitive: Boolean,

    irregular: Boolean,
  },
  {
    _id: false,
  },
);

const DefinitionSchema = new Schema<IDefinition>(
  {
    meaning: {
      type: String,
      required: true,
      trim: true,
    },

    partOfSpeech: {
      type: String,
      required: true,
      enum: Object.values(PartOfSpeech),
    },

    grammar: GrammarSchema,

    examples: {
      type: [ExampleSchema],
      default: [],
    },

    synonyms: {
      type: [String],
      default: [],
    },

    antonyms: {
      type: [String],
      default: [],
    },

    notes: String,

    tags: {
      type: [String],
      default: [],
    },
  },
  {
    _id: true,
  },
);

const WordSchema = new Schema<IWord>(
  {
    word: {
      type: String,
      required: true,
      trim: true,
    },

    normalizedWord: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    language: {
      type: String,
      default: "en",
      lowercase: true,
    },

    pronunciation: {
      ipa: String,

      audio: String,
    },

    syllables: {
      type: [String],
      default: [],
    },

    frequency: Number,

    level: {
      type: String,
      enum: Object.values(LanguageLevel),
    },

    origin: String,

    definitions: {
      type: [DefinitionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

/* ============================================================================
 * INDEXES
 * ==========================================================================*/

/**
 * Text search.
 */
WordSchema.index({
  word: "text",
});

/* ============================================================================
 * MIDDLEWARE
 * ==========================================================================*/

/**
 * Automatically create normalizedWord before saving.
 */
import type { HydratedDocument } from "mongoose";

WordSchema.pre("save", function (this: HydratedDocument<IWord>) {
  this.normalizedWord = this.word.toLowerCase().trim();
});

/* ============================================================================
 * MODEL
 * ==========================================================================*/

export const Word: Model<IWord> =
  mongoose.models.Word || mongoose.model<IWord>("Word", WordSchema);

export default Word;
