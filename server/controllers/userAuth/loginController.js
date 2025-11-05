import SessionServices from "../../services/sessionServices.js";
import UserServices from "../../services/userServices.js";
import jwt from "jsonwebtoken";

const userServices = new UserServices();
const sessionServices = new SessionServices();

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ip = req.ip;
    const userAgent = req.headers["user-agent"];

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const result = await userServices.loginUser(email, password);

    if (!result.success) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const user = result.user;

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "90d",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 90 * 24 * 60 * 60 * 1000,
    });

  const currentDeviceSession =  await sessionServices.findByIp(ip);
  if(currentDeviceSession) {
    await sessionServices.deleteSession({ip:ip});
  }

    await sessionServices.createSession({
      userId: user._id,
      ip,
      refreshToken,
      userAgent,
    });

    return res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
