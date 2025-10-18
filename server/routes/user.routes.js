import { Router } from "express";
import { registerUser } from "../controllers/user/userProfileController.js";
import { userSkills } from "../controllers/user/skillsController.js";

const router = Router({ mergeParams: true });

router.post("/user", registerUser);
router.put("/profile/skills",userSkills);

export default router;
