import { z } from "zod";

import {
  createWordSchema,
  definitionSchema,
  exampleSchema,
  grammarSchema,
  pronunciationSchema,
} from "./dto/create-word.dto";
import { LANGUAGE_LEVELS, PART_OF_SPEECH } from "./word.constants";

export type CreateWordInput = z.infer<typeof createWordSchema>;

export type Definition = z.infer<typeof definitionSchema>;

export type Example = z.infer<typeof exampleSchema>;

export type Grammar = z.infer<typeof grammarSchema>;

export type Pronunciation = z.infer<typeof pronunciationSchema>;

export type WordQueryParams = {
  page?: string | number;
  limit?: string | number;
  sort?: string;
  level?: (typeof LANGUAGE_LEVELS)[number];
  partOfSpeech?: (typeof PART_OF_SPEECH)[number];
  search?: string;
};
