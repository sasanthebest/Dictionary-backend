import type { Request, Response } from "express";
import * as wordService from "./word.service";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { AppError } from "../../utils/AppError";
import { getRequiredParam } from "../../utils/getRequiredParams";

/**
 * CREATE word
 */
export const createWord = asyncHandler(async (req: Request, res: Response) => {
  console.log("body request:", req.body);

  const result = await wordService.createWord(req.body);
  res.status(201).json(result);
});

/**
 * GET word
 */
export const getWordById = asyncHandler(async (req: Request, res: Response) => {
  const id = getRequiredParam(req, "id");

  const result = await wordService.getWordById(id);

  if (!result.success) {
    throw new AppError(result.message || "Not found", 404);
  }

  res.json(result);
});

/**
 * SEARCH words
 */
export const searchWords = asyncHandler(async (req: Request, res: Response) => {
  const result = await wordService.searchWords(req.query.q as string);
  res.json(result);
});

/**
 * UPDATE word
 */
export const updateWord = asyncHandler(async (req: Request, res: Response) => {
  const id = getRequiredParam(req, "id");

  const result = await wordService.updateWord(id, req.body);

  if (!result.success) {
    throw new AppError(result.message || "Not found", 404);
  }

  res.json(result);
});

/**
 * DELETE word
 */
export const deleteWord = asyncHandler(async (req: Request, res: Response) => {
  const id = getRequiredParam(req, "id");

  const result = await wordService.deleteWord(id);

  if (!result.success) {
    throw new AppError(result.message || "Not found", 404);
  }

  res.json(result);
});

/**
 * GET WORDS (pagination + filter + sort)
 */
export const getWords = asyncHandler(async (req: Request, res: Response) => {
  const result = await wordService.getWords(req.query);
  res.json(result);
});

/**
 * fuzzySearchWords
 */
export const fuzzySearchWords = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await wordService.fuzzySearchWords(req.query.q as string);

    res.json(result);
  },
);

/**
 * autocompleteWords
 */
export const autocompleteWords = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await wordService.autocompleteWords(req.query.q as string);

    res.json(result);
  },
);
