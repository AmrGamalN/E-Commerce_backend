import { OrderService } from "../services/order.service.js";

export class OrderController {
  constructor() {
    this.orderService = OrderService.getInstance();
  }

  createOrder = async (req, res, next) => {
    try {
      const { items, address } = req.body;
      const userId = req.user.id; 
      const result = await this.orderService.createOrder(userId, items, address);
      res.status(result.statusCode).json(result);
    } catch (err) {
      next(err);
    }
  }

  getUserOrders = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const result = await this.orderService.getUserOrders(userId);
      res.status(result.statusCode).json(result);
    } catch (err) {
      next(err);
    }
  }

  getAllOrders = async (req, res, next) => {
    try {
      const result = await this.orderService.getAllOrders();
      res.status(result.statusCode).json(result);
    } catch (err) {
      next(err);
    }
  }

  getOrderById = async (req, res, next) => {
    try {
      const result = await this.orderService.getOrderById(req.params.id);
      res.status(result.statusCode).json(result);
    } catch (err) {
      next(err);
    }
  }

  updateOrderStatus = async (req, res, next) => {
    try {
      const result = await this.orderService.updateOrderStatus(req.params.id, req.body.status);
      res.status(result.statusCode).json(result);
    } catch (err) {
      next(err);
    }
  }

  cancelOrder = async (req, res, next) => {
    try {
      const result = await this.orderService.cancelOrder(req.params.id);
      res.status(result.statusCode).json(result);
    } catch (err) {
      next(err);
    }
  }
}
