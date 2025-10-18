import UserProfileServices from "../../services/userProfileServices.js";
import UserServices from "../../services/userServices.js";

const userProfileServices = new UserProfileServices();
const userServices = new UserServices();

export const profileUpdate = async (req, res) => {
  const { fullName, bio, professionalRole, mobileNo, location } = req.body;
  delete req.body.email;
  delete req.body.username;
  const id = req.userId;
  console.log("here goes id", id);
  try {
    const profile = await userProfileServices.getOne({ userId: id });
    console.log("here it is profile", profile);

    if (!profile) {
      return res.status(500).json({
        success: true,
        message: "No profile exists",
      });
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
