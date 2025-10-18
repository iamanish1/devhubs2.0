import { UserProfile } from "../models/userProfileSchema.js";

class UserProfileRepository {
  async create(data) {
    return await UserProfile.create(data);
  }

  async update(id, data) {
    return await UserProfile.findByIdAndUpdate(id, data);
  }

  async updateUserSkills(id, newSkills) {
    return await UserProfile.updateOne(
      { _id: id },
      {$addToSet:{skills:{$each:newSkills}}},
      {returnOriginal:false}
    );
  }

  async delete(id) {
    return await UserProfile.findOneAndDelete(id);
  }

  async findById(id) {
    return await UserProfile.findById(id);
  }

  async findByEmail(email) {
    return await UserProfile.findOne({ email });
  }

  async findByUserName(username) {
    return await UserProfile.findOne({ username });
  }
}

export default UserProfileRepository;
