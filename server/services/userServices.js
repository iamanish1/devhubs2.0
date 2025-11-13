import userRepository from "../repositories/userRepository.js";
import { roleValidator } from "../validators/userValidators.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../verifications/emailVerification.js";
import { generateTokens } from "../authServices/generateTokens.js";
import SessionServices from "./sessionServices.js";


const sessionService = new SessionServices()
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

  async loginUser(email, password) {
    try {
      const user = await this.userRepo.findByEmail(email);
      
      if (!user) {
        return {
          success: false,
          message: "Email or password is incorrect",
          user: null,
        };
      }

      const checkedPassword = await bcrypt.compare(password, user.password);
      if (!checkedPassword) {
        return {
          success: false,
          message: "Email or password is incorrect",
          user: null,
        };
      }

      user.loggedInAt = new Date();
      await user.save();
      return { success: true, message: "Login successful", user };
    } catch (error) {
      
      return { success: false, message: "Something went wrong", user: null };
    }
  }

  //__________I forgot about below code what i was thinking when writing it ____________//

  // async isUserLoggedIn(data) {
  //   const { email, password } = data;
  //   const user = await this.userRepo.findByEmail(email);
  //   if (!user) throw new Error("Email or password is incorrect");
  //   const checkPassword = bcrypt.compare(password, user.password);
    
  //   if (!checkPassword) {
  //     throw new Error("Email or password is incorrect");
  //   }

  //   user.isUserLoggedIn = Date.now;
  //   await user.save();

  //   return user;
  // }

  async logoutUser(token,userId){
  return await sessionService.deleteSession(token,userId)
  }

}

export default UserServices;
