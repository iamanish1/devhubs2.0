import UserProfileServices from "../../services/userProfileServices.js";

const userProfileServices = new UserProfileServices();

export const getProfile = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res
      .status(404)
      .json({ success: false, message: "id should not be null" });
  try {
    const profile = await userProfileServices.isUserProfileExists(id);
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "can not find profile with id" });
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
