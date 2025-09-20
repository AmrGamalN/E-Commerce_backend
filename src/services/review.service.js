import { Review } from "../models/review.model.js";

export class ReviewService {
  static instance;
  static getInstance() {
    if (!ReviewService.instance) ReviewService.instance = new ReviewService();
    return ReviewService.instance;
  }

  async addReview(userId, itemId, rating, comment) {
    const review = await Review.create({ userId, itemId, rating, comment });
    return { review, statusCode: 201, success: true };
  }

  async updateReview(reviewId, rating, comment) {
    const review = await Review.findById(reviewId);
    if (!review) throw new Error("Review not found");
    review.rating = rating;
    review.comment = comment;
    await review.save();
    return { review, statusCode: 200, success: true };
  }

  async deleteReview(reviewId) {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) throw new Error("Review not found");
    return { message: "Review deleted", statusCode: 200, success: true };
  }

  async getItemReviews(itemId) {
    const reviews = await Review.find({ itemId }).populate("userId");
    return { reviews, statusCode: 200, success: true };
  }
}
