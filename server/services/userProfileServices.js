import UserProfileRepository from "../repositories/userProfileRepository.js";
import { roleValidator } from "../validators/userValidators.js";

class UserProfileServices {
  constructor() {
    this.userProfileRepo = new UserProfileRepository();
  }

  async isUserProfileExists(id) {
    return await this.userProfileRepo.findById(id);
  }

  async registerUserProfile(data) {
    const existingUserProfile = await this.userProfileRepo.findByEmail(
      data.email
    );
    if (existingUserProfile) throw new Error("Email already used");

    const userWithUsername = await this.userProfileRepo.findByUserName(
      data.username
    );
    if (userWithUsername) throw new Error("user name must be unique");
    
    if (!roleValidator(data.professionalRole)) {
      throw new Error(`${data.professionalRole} is not allowed`);
    }
    return await this.userProfileRepo.create(data);
  }

  async deleteUserProfile(id) {
    const isUserProfileExists = await this.isUserProfileExists(id);
    if (!isUserProfileExists) throw new Error("Profile does not exist");
    return await this.userProfileRepo.delete(id);
  }

  async updateUserProfile(id, data) {
    const isUserProfileExists = await this.isUserProfileExists(id);
    if (!isUserProfileExists) throw new Error("Profile does not exist");
    return await this.userProfileRepo.update(id, data);
  }

  async isEmailVerified(id) {
    const userProfile = await this.isUserProfileExists(id);
    if (!userProfile) throw new Error("Profile does not exist");
    return userProfile.isEmailVerified === true;
  }

  async verifyEmail(id) {
    const userProfile = await this.isUserProfileExists(id);
    if (!userProfile) throw new Error("Profile does not exist");
    userProfile.isEmailVerified = true;
    userProfile.save();
    return userProfile.isEmailVerified === true;
  }

  async verifyNumber(id) {
    const userProfile = await this.isUserProfileExists(id);
    if (!userProfile) throw new Error("Profile does not exist");
    userProfile.isNumberVerified = true;
    return userProfile.isEmailVerified === true;
  }

  async isNumberVerified(id) {
    const userProfile = await this.isUserProfileExists(id);
    if (!userProfile) return new Error("Profile does not exist");
    return userProfile.isEmailVerified === true;
  }

  async updateProfilePicture(id, imageLink) {
    const userProfile = await this.isUserProfileExists(id);
    if (!userProfile) {
      throw new Error("Profile does not exist");
    }

    userProfile.profilePicture = imageLink;
    await userProfile.save();
  }
}

export default UserProfileServices;
