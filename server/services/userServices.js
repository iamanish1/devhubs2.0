import userRepository from "../repositories/userRepository.js";
import { roleValidator } from "../validators/userValidators.js";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../verifications/emailVerification.js";
import { generateTokens } from "../authServices/generateTokens.js";

class UserServices {
  constructor() {
    this.userRepo = new userRepository();
  }

  async getUser(id) {
    return await this.userRepo.findById(id);
  }

  async registerUser(data) {
    const existingUser = await this.userRepo.findByEmail(data.email);
    if (existingUser) throw new Error("Email already exist");
    const userWithSameUsername = await this.userRepo.findByUserName(
      data.username
    );
    if (userWithSameUsername) throw new Error("username is not available");
    if (!roleValidator(data.professionalRole)) {
      throw new Error("role is not valid");
    }

    const newUser = await this.userRepo.create(data);
    const token = generateTokens(newUser);
    console.log("here comes token", token);

    verifyEmail(data.email, token.accessToken);
    newUser.accessToken = token.accessToken;
    newUser.refreshToken = token.refreshToken;
    await newUser.save();
    return newUser;
  }

  async listUser() {
    return await this.userRepo.findAll();
  }

  async updateUser(id, data) {
    return await this.userRepo.update(id, data);
  }

  async deleteUser(id) {
    const existingUser = await this.userRepo.findById(id);
    if (!existingUser) throw new Error("User is Invalid");
    return await this.userRepo.delete(id);
  }

  async isEmailVerified(id) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error("User is not present");
    return user.isEmailVerified === true;
  }

  async isNumberVerified(id) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error("User is not present");
    return user.isNumberVerified === true;
  }

  async loginUser(id) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error("User is not present");
    user.isUserLoggedIn = true;
    return user.isUserLoggedIn === true;
  }

  async isUserLoggedIn(id) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error("User is not present");
    return user.isUserLoggedIn === true;
  }
}

export default UserServices;
