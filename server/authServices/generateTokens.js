import jwt from "jsonwebtoken";

export function generateTokens(user) {
  const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "90m",
  });

  return { accessToken, refreshToken };
}
