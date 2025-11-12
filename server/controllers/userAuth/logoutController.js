
import UserServices from "../../services/userServices.js";
import jwt from "jsonwebtoken";

const userServices = new UserServices();
export const logoutUser = async (req, res) => {
  try {
    const authorization = req.headers["authorization"];
    const token = authorization?.split(" ")[1];
    const userId = req.user._id.toString();

    try {
      const verify = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    const result = await userServices.logoutUser(token, userId);
    if (!result.deletedCount) {
      return res.status(400).json({
        success: false,
        message: "Logout unsuccessful",
      });
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
