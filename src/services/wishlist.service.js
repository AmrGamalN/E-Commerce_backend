import { Wishlist } from "../models/wishlist.model.js";

export class WishlistService {
  static instance;
  static getInstance() {
    if (!WishlistService.instance) WishlistService.instance = new WishlistService();
    return WishlistService.instance;
  }

  async addToWishlist(userId, itemId) {
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $addToSet: { items: itemId } }, 
      { upsert: true, new: true } 
    );

    return { wishlist, statusCode: 201, success: true };
  }

  async removeFromWishlist(userId, itemId) {
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { items: itemId } },
      { new: true }
    );

    if (!wishlist) throw new Error("Wishlist not found");

    return { wishlist, message: "Item removed", statusCode: 200, success: true };
  }

  async getUserWishlist(userId) {
    const items = await Wishlist.findOne({ userId }).populate("items");
    
    if (!items) throw new Error("Wishlist not found");
    
    return { items, statusCode: 200, success: true };
  }
}