import express from "express";
import { WishlistController } from "../controllers/wishlist.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();
const controller = new WishlistController();

router.use(authMiddleware);

router.get("/", roleMiddleware("User","Admin","Manager"), controller.getUserWishlist);
router.post("/:itemId", roleMiddleware("User","Admin"), controller.addToWishlist);
router.delete("/:itemId", roleMiddleware("User","Admin"), controller.removeFromWishlist);

export default router;
