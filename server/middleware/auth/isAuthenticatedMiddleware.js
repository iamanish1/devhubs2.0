import jwt from "jsonwebtoken";
import UserServices from "../../services/userServices.js";
import { AppError } from "../../utils/appError.js";

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
        return next(
          new AppError(
            "Access Token expired. Use refresh token to regenerate.",
            401
          )
        );
      }

      return next(new AppError("Invalid Access Token.", 401));
    }

    //Finding user

    const user = await userServices.getUser(decoded.id);
    if (!user) {
      return next(new AppError("User not found", 404));
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
