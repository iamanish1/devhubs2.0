import jwt from "jsonwebtoken";
import UserServices from "../../services/userServices.js";

const userServices = new UserServices();

export const isAuthenticated = async (req, res, next) => {
  try {
    let token = req.cookies?.accessToken;
    
    if (!token) {
      return res.status(402).json({
        success: false,
        message: "Invalid or missing accessToken",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      if ((error.message = "TokenExpireError")) {
        return res.status(401).json({
          success: false,
          message: "Access Token expired. Use refresh token to regenerate.",
        });
      }

      return res.status(401).json({
        success: false,
        message: "Invalid Access Token.",
      });
    }

    //Finding user

    const user = await userServices.getUser(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
