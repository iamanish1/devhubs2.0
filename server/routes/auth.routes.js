import { Router } from "express";
import { loginUser } from "../controllers/userAuth/loginController.js";
import { rateLimit } from "../middleware/auth/rateLimitMiddleware.js";

const router = Router({ mergeParams: true });

router.post("/login",rateLimit({limit:10,timer:60,key:"login"}) ,loginUser);

export default router;
