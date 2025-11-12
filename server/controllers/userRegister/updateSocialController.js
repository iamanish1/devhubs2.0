import UserProfileServices from "../../services/userProfileServices.js";
import { AppError } from "../../utils/appError.js";

const userProfileServices = new UserProfileServices();

export const profileSocialUpdate = async (req, res) => {
  const id = req.userId;
  const { socialLinks } = req.body;

  try {
    const profile = await userProfileServices.getOne({ userId: id });
    if (!profile) {
      return next(new AppError("No profile found", 404));
    }
    const updatedSocial = await userProfileServices.updateSocialLinks(
      profile._id,
      socialLinks
    );

    return res.status(200).json({
      success: true,
      message: "Social Links updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
