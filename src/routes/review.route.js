import express from "express";
import { ReviewController } from "../controllers/review.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();
const reviewController = new ReviewController();

router.post("/", authMiddleware, reviewController.addReview);
router.patch("/", authMiddleware, reviewController.updateReview);
router.delete("/", authMiddleware, reviewController.deleteReview);
router.get("/:itemId", reviewController.getItemReviews);

export default router;
