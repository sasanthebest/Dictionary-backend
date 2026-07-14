import { z } from "zod";

import {
  createWordSchema,
  definitionSchema,
  exampleSchema,
  grammarSchema,
  pronunciationSchema,
} from "./dto/create-word.dto";

export type CreateWordInput = z.infer<typeof createWordSchema>;

export type Definition = z.infer<typeof definitionSchema>;

export type Example = z.infer<typeof exampleSchema>;

export type Grammar = z.infer<typeof grammarSchema>;

export type Pronunciation = z.infer<typeof pronunciationSchema>;
