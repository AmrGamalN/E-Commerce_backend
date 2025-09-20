import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/user.route.js";
import itemRoutes from "./src/routes/item.route.js";
import wishlistRoutes from "./src/routes/wishlist.route.js";
import reviewRoutes from "./src/routes/review.route.js";
import { errormiddleware } from "./src/middlewares/handleError.middleware.js";
import orderRoutes  from "./src/routes/order.route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", userRoutes);       
app.use("/api/items", itemRoutes);
app.use("/api/orders", orderRoutes );
app.use("/api/wishlist", wishlistRoutes); 
app.use("/api/reviews", reviewRoutes);   

app.use(errormiddleware);

export default app;
