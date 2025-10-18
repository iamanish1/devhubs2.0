import { Router } from "express";
import { registerUser } from "../controllers/user/userRegisterController.js";
import { userSkills } from "../controllers/user/skillsController.js";
import { getCurrUser } from "../middleware/user/authenticateUserMiddleware.js";
import { profileUpdate } from "../controllers/user/profileUpdateController.js";


const router = Router({ mergeParams: true });

router.post("/user", registerUser);
router.put("/profile/skills",getCurrUser,userSkills);
router.put("/profile",getCurrUser,profileUpdate);

export default router;
