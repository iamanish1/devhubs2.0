
import UserServices from "../../services/userServices.js";
import jwt from "jsonwebtoken";
import { AppError } from "../../utils/appError.js";

const userServices = new UserServices();
export const logoutUser = async (req, res,next) => {
  try {
    const authorization = req.headers["authorization"];
    const token = authorization?.split(" ")[1];
    const userId = req.user._id.toString();

    try {
      const verify = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return next(new AppError( "Invalid token"),401);
    }

    const result = await userServices.logoutUser(token, userId);
    if (!result.deletedCount) {
      return next(new AppError("Logout unsuccessful"),400);
    } else {
      res.clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
