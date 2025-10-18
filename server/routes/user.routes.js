import { Router } from "express";
import { registerUser } from "../controllers/userProfileController.js";

const router = Router({ mergeParams: true });

router.post("/profile", registerUser);

export default router;
