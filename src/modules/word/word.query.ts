type WordQueryParams = {
  page?: string;
  limit?: string;
  sort?: string;
  level?: string;
  partOfSpeech?: string;
  search?: string;
};

export const buildWordQuery = (params: WordQueryParams) => {
  const {
    page = "1",
    limit = "20",
    sort,
    level,
    partOfSpeech,
    search,
  } = params;

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
  const skip = (Number(page) - 1) * Number(limit);

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
      limit: Number(limit),
    },
    sort: sortOption,
  };
};
