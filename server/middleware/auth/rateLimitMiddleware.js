import { redis } from "../../database/redisConfig.js";

export const rateLimit =
  ({ limit = 10, timer = 60, key }) =>
  async (req, res, next) => {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    
    let fullKey = `${clientIp}:key:request_count`;

    const reqCount = await redis.incr(fullKey);

    if (reqCount === 1) await redis.expire(fullKey, timer);

    if (reqCount > limit) {
      let ttl = await redis.ttl(fullKey);

      return res.status(400).json({
        message: `To many login request try after ${ttl} seconds`,
      });
    }

    next();
  };
