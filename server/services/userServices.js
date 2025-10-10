import userRepository from "../repositories/userRepository";

class userService {
  constructor() {
    this.userRepo = new userRepository();
  }
  async registerUser(data) {
    const existingUser = await this.userRepo.findByEmail(data.email);
    if (existingUser) throw new Error("Email already exist");
    const newUser = await this.userRepo.create(data);
    await newUser.save();
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

  async verifyEmail(email) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("User not found");
    user.isEmailVerified = true;
    await user.save();
    return user.isEmailVerified === true;
  }

  async isEmailVerified(id) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error("User is not present");
    return user.isEmailVerified === true;
  }

  async verifyNumber(id) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error("User is not present");
    user.isNumberVerified = true;
    await user.save();
    return user.isNumberVerified === true;
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

export default userService;
