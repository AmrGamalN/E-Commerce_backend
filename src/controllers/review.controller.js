import { ReviewService } from "../services/review.service.js";

export class ReviewController {
  constructor() {
    this.reviewService = ReviewService.getInstance();
  }

  addReview = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { itemId, rating, comment } = req.body;
      const result = await this.reviewService.addReview(userId, itemId, rating, comment);
      res.status(result.statusCode).json(result);
    } catch (err) { next(err); }
  }

  updateReview = async (req, res, next) => {
    try {
      const { reviewId, rating, comment } = req.body;
      const result = await this.reviewService.updateReview(reviewId, rating, comment);
      res.status(result.statusCode).json(result);
    } catch (err) { next(err); }
  }

  deleteReview = async (req, res, next) => {
    try {
      const { reviewId } = req.body;
      const result = await this.reviewService.deleteReview(reviewId);
      res.status(result.statusCode).json(result);
    } catch (err) { next(err); }
  }

  getItemReviews = async (req, res, next) => {
    try {
      const { itemId } = req.params;
      const result = await this.reviewService.getItemReviews(itemId);
      res.status(result.statusCode).json(result);
    } catch (err) { next(err); }
  }
}
