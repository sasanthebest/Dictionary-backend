import { CreateWordInput } from "./word.types";

export type WordDocument = CreateWordInput & {
  _id: string;

  normalizedWord: string;

  createdAt: Date;

  updatedAt: Date;
};
