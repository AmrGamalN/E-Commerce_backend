import express from "express";
import { OrderController } from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();
const controller = new OrderController();

router.use(authMiddleware);

router.post("/", roleMiddleware("User","Admin","Manager"), controller.createOrder);
router.get("/", roleMiddleware("Admin","Manager"), controller.getAllOrders);
router.get("/:id", roleMiddleware("User","Admin","Manager"), controller.getOrderById);
router.patch("/:id/status", roleMiddleware("Admin","Manager"), controller.updateOrderStatus);

export default router;
