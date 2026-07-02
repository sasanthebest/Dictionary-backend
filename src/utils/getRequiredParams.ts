import type { Request } from "express";
import { AppError } from "../utils/AppError";

/**
 * Returns a required route parameter.
 *
 * Throws a 400 Bad Request if the parameter is missing or invalid.
 *
 * @example
 * const id = getRequiredParam(req, "id");
 */
export const getRequiredParam = (req: Request, paramName: string): string => {
  const value = req.params[paramName];

  if (typeof value !== "string" || value.trim() === "") {
    throw new AppError(`Missing or invalid route parameter: ${paramName}`, 400);
  }

  return value;
};
