import UserProfileServices from "../../services/userProfileServices.js";
import { AppError } from "../../utils/appError.js";

const userProfileServices = new UserProfileServices();

export const getProfile = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return next(new AppError( "id should not be null"),404);
  try {
    const profile = await userProfileServices.isUserProfileExists(id);
    if (!profile) {
      return next("can not find profile with provided id",404)
    }

    return res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
