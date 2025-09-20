import express from "express";
import { ItemController } from "../controllers/item.controller.js";
import { zodValidation } from "../middlewares/validation.middleware.js";
import { createItemSchema, updateItemSchema } from "../dto/item.dto.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();
const itemController = new ItemController();

router.use(authMiddleware);

router.post(
  "/",
  roleMiddleware("Admin", "Manager"),
  zodValidation(createItemSchema),
  itemController.createItem
);
router.patch(
  "/:id",
  roleMiddleware("Admin", "Manager"),
  zodValidation(updateItemSchema),
  itemController.updateItem
);
router.delete("/:id", roleMiddleware("Admin"), itemController.deleteItem);

router.get("/", itemController.getAllItems);
router.get("/:id", itemController.getItemById);

export default router;