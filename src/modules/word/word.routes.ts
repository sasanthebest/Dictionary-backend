import { Router } from "express";
import * as controller from "./word.controller";
import { validate } from "../../middlewares/validate";
import { createWordSchema } from "./dto/create-word.dto";
import { updateWordSchema } from "./dto/update-word.dto";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

/**
 * IMPORTANT: put this ABOVE "/:id"
 */
router.get("/", controller.getWords);

router.get("/search", controller.searchWords);
router.get("/:id", controller.getWordById);

router.post(
  "/",
  authMiddleware,
  validate(createWordSchema),
  controller.createWord,
);
router.put(
  "/:id",
  authMiddleware,
  validate(updateWordSchema),
  controller.updateWord,
);
router.delete("/:id", authMiddleware, controller.deleteWord);
router.get("/fuzzy", controller.fuzzySearchWords);
router.get("/autocomplete", controller.autocompleteWords);
export default router;
