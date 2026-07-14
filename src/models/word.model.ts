import mongoose, { Schema, Model } from "mongoose";

import {
  CreateWordInput,
  Definition,
  Example,
  Grammar,
  Pronunciation,
} from "../modules/word/word.types";
import {
  LANGUAGE_LEVELS,
  PART_OF_SPEECH,
} from "../modules/word/word.constants";

/*
-----------------------------------
Example Schema
-----------------------------------
*/

const ExampleSchema = new Schema<Example>(
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

/*
-----------------------------------
Grammar Schema
-----------------------------------
*/

const GrammarSchema = new Schema<Grammar>(
  {
    transitive: Boolean,

    irregular: Boolean,
  },
  {
    _id: false,
  },
);

/*
-----------------------------------
Pronunciation Schema
-----------------------------------
*/

const PronunciationSchema = new Schema<Pronunciation>(
  {
    ipa: String,

    audio: String,
  },
  {
    _id: false,
  },
);

/*
-----------------------------------
Definition Schema
-----------------------------------
*/

const DefinitionSchema = new Schema<Definition>({
  meaning: {
    type: String,
    required: true,
    trim: true,
  },

  partOfSpeech: {
    type: String,
    required: true,
    enum: PART_OF_SPEECH,
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

  tags: {
    type: [String],
    default: [],
  },

  notes: String,
});

/*
-----------------------------------
Main Word Schema
-----------------------------------
*/

const WordSchema = new Schema<CreateWordInput>(
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
      index: true,
    },

    language: {
      type: String,
      default: "en",
    },

    pronunciation: PronunciationSchema,

    syllables: {
      type: [String],
      default: [],
    },

    frequency: Number,

    level: {
      type: String,
      enum: LANGUAGE_LEVELS,
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

WordSchema.index({
  word: "text",
});

export const Word: Model<CreateWordInput> =
  mongoose.models.Word || mongoose.model<CreateWordInput>("Word", WordSchema);
