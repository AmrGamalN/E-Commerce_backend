import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { connectDB } from "./src/config/mongodb.config.js";
import { redisClient } from "./src/config/redis.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    await redisClient.connect();
    console.log(" MongoDB w Redis connecteddddddddd");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} tmaammm`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
};

startServer();
