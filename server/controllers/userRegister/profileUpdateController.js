import UserProfileServices from "../../services/userProfileServices.js";
import { AppError } from "../../utils/appError.js";


const userProfileServices = new UserProfileServices();

export const profileUpdate = async (req, res) => {
  const { fullName, bio, professionalRole, mobileNo, location } = req.body;
  delete req.body.email;
  delete req.body.username;
  const id = req.userId;

  try {
    const profile = await userProfileServices.getOne({ userId: id });
    if (!profile) {
      return next(new AppError( "No profile exists"),404);
      
    }

    const userProfile = await userProfileServices.updateUserProfile(
      profile._id,
      {
        fullName,
        bio,
        mobileNo,
        professionalRole,
        location,
      }
    );

    return res.status(200).json({
      success: true,
      message: "User Profile updated successfully",
      userProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
