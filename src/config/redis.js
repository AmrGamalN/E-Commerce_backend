import redis from "redis";
import dotenv from "dotenv";
dotenv.config();

console.log("REDIS_PORT env:", process.env.REDIS_PORT); 

export const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT), 
  },
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("connect", () => console.log("Connected to Redis Cloud"));
redisClient.on("error", (err) => console.error("Redis error:", err));
