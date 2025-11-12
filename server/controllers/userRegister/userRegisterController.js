import UserServices from "../../services/userServices.js";
import UserProfileServices from "../../services/userProfileServices.js";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/appError.js";

const userServices = new UserServices();
const userProfileServices = new UserProfileServices();

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, professionalRole } = req.body;
    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !professionalRole.trim()
    ) {
      return next(new AppError("All fields are required"),404);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userServices.registerUser({
      username,
      email,
      password: hashedPassword,
      professionalRole,
    });
    const newUserProfile = await userProfileServices.registerUserProfile({
      username,
      userId: newUser._id,
      email,
      password: hashedPassword,
      professionalRole,
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      newUser,
      newUserProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
