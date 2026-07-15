import { Router } from "express";
import * as controller from "./word.controller";
import { validate } from "../../middlewares/validate";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { createWordSchema } from "./dto/create-word.dto";
import { updateWordSchema } from "./dto/update-word.dto";

const router = Router();

/**
 * IMPORTANT: put this ABOVE "/:id"
 */
router.post("/", controller.getWords);

router.get("/search", controller.searchWords);
router.get("/fuzzy", controller.fuzzySearchWords);
router.get("/autocomplete", controller.autocompleteWords);
router.get("/:id", controller.getWordById);

router.post(
  "/add",
  authMiddleware,
  validate(createWordSchema),
  controller.createWord,
);
router.put(
  "/:id",
  authMiddleware,
  validate(createWordSchema),
  controller.updateWord,
);
router.delete("/:id", authMiddleware, controller.deleteWord);
export default router;
