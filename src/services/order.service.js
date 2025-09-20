import { Order } from "../models/order.model.js";

export class OrderService {
  static instance;
  static getInstance() {
    if (!OrderService.instance) OrderService.instance = new OrderService();
    return OrderService.instance;
  }

  async createOrder(userId, items, address) {
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const order = await Order.create({ userId, items, totalPrice, address });
    return { order, statusCode: 201, success: true };
  }

  async getUserOrders(userId) {
    const orders = await Order.find({ userId });
    return { orders, statusCode: 200, success: true };
  }

  async getAllOrders() {
    const orders = await Order.find();
    return { orders, statusCode: 200, success: true };
  }

  async getOrderById(orderId) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");
    return { order, statusCode: 200, success: true };
  }

  async updateOrderStatus(orderId, status) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");
    order.status = status;
    await order.save();
    return { order, statusCode: 200, success: true };
  }

  async cancelOrder(orderId) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");
    if (order.status !== "Pending") throw new Error("Cannot cancel this order");
    order.status = "Cancelled";
    await order.save();
    return { order, statusCode: 200, success: true };
  }
}
