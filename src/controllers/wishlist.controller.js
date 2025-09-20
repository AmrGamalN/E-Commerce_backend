import { WishlistService } from "../services/wishlist.service.js";

export class WishlistController {
  constructor() {
    this.wishlistService = WishlistService.getInstance();
  }

  addToWishlist = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { itemId } = req.params;
      const result = await this.wishlistService.addToWishlist(userId, itemId);
      res.status(result.statusCode).json(result);
    } catch (err) { next(err); }
  }

  removeFromWishlist = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { itemId } = req.params;
      const result = await this.wishlistService.removeFromWishlist(userId, itemId);
      res.status(result.statusCode).json(result);
    } catch (err) { next(err); }
  }

  getUserWishlist = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const result = await this.wishlistService.getUserWishlist(userId);
      res.status(result.statusCode).json(result);
    } catch (err) { next(err); }
  }
}
