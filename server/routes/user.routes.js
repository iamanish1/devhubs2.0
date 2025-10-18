import { Router } from "express";
import { registerUser } from "../controllers/user/userRegisterController.js";
import { userSkills } from "../controllers/user/skillsController.js";
import { getCurrUser } from "../middleware/user/authenticateUserMiddleware.js";
import { profileUpdate } from "../controllers/user/profileUpdateController.js";
import { profileSocialUpdate } from "../controllers/user/updateSocialController.js";
import { getProfile } from "../controllers/user/getProfileController.js";

const router = Router({ mergeParams: true });

router.post("/user", registerUser);
router.put("/profile/skills", getCurrUser, userSkills);
router.get("/profile/:id", getProfile);
router.put("/profile", getCurrUser, profileUpdate);
router.put("/profile/social", getCurrUser, profileSocialUpdate);

export default router;
