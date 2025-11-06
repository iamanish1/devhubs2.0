import { Router } from "express";
import { registerUser } from "../controllers/userRegister/userRegisterController.js";
import { userSkills } from "../controllers/userRegister/skillsController.js";
import { getCurrUser } from "../middleware/user/authenticateUserMiddleware.js";
import { profileUpdate } from "../controllers/userRegister/profileUpdateController.js";
import { profileSocialUpdate } from "../controllers/userRegister/updateSocialController.js";
import { getProfile } from "../controllers/userRegister/getProfileController.js";

const router = Router({ mergeParams: true });

router.post("/auth/register", registerUser);
router.put("/profile/skills", getCurrUser, userSkills);
router.get("/profile/:id", getProfile);
router.put("/profile", getCurrUser, profileUpdate);
router.put("/profile/social", getCurrUser, profileSocialUpdate);


export default router;
