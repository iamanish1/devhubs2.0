import { Redis } from "ioredis";
import { configDotenv } from "dotenv";

configDotenv();
export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

export const connectRedis = () => {
  redis.on("connect", () => {
    console.log("Redis connected successfully");
  });

  redis.on("error", (err) => {
    console.log("Error occurred in connecting redis", err);
  });
};
