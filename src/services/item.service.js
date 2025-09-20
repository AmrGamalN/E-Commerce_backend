import { Item } from "../models/item.model.js";

export class ItemService {
  static instance;
  static getInstance() {
    if (!ItemService.instance) ItemService.instance = new ItemService();
    return ItemService.instance;
  }

  async createItem(data) {
    const item = await Item.create({ ...data });
    return { item, statusCode: 201, success: true };
  }

  async getAllItems(query) {
    const items = await Item.find({ isDeleted: false });
    return { items, statusCode: 200, success: true };
  }

  async getItemById(id) {
    const item = await Item.findById(id);
    if (!item) throw new Error("Item not found");
    return { item, statusCode: 200, success: true };
  }

  async updateItem(id, data) {
    const item = await Item.findById(id);
    if (!item) throw new Error("Item not found");
    Object.assign(item, data);
    await item.save();
    return { item, statusCode: 200, success: true };
  }

  async deleteItem(id) {
    const item = await Item.findById(id);
    if (!item) throw new Error("Item not found");
    item.isDeleted = true;
    await item.save();
    return { message: "Item deleted", statusCode: 200, success: true };
  }
}