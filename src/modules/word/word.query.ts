import { WordQueryParams } from "./word.types";

export const buildWordQuery = (params: WordQueryParams) => {
  const { page, limit, sort, level, partOfSpeech, search } = params;

  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 20;

  const query: any = {};

  /* ---------------- search ---------------- */
  if (search) {
    query.normalizedWord = {
      $regex: search.toLowerCase(),
      $options: "i",
    };
  }

  /* ---------------- filters ---------------- */
  if (level) {
    query.level = level;
  }

  if (partOfSpeech) {
    query["definitions.partOfSpeech"] = partOfSpeech;
  }

  /* ---------------- pagination ---------------- */
  const skip = (pageNumber - 1) * limitNumber;

  /* ---------------- sorting ---------------- */
  let sortOption: any = { createdAt: -1 };

  if (sort) {
    switch (sort) {
      case "word":
        sortOption = { word: 1 };
        break;
      case "frequency":
        sortOption = { frequency: -1 };
        break;
      case "newest":
        sortOption = { createdAt: -1 };
        break;
    }
  }

  return {
    query,
    pagination: {
      skip,
      limit: limitNumber,
    },
    sort: sortOption,
  };
};
