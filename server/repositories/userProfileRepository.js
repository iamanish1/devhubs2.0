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
      { $addToSet: { skills: { $each: newSkills } } },
      { returnOriginal: false }
    );
  }

  async updateSocialLinks(id, newLinks) {
    console.log("here consoling newLinks",newLinks)
    const updates = {};
    for (let [platform, value] of Object.entries(newLinks)) {
      if (platform === "custom" && value === "object") {
        for (let [key, url] of Object.entries(value)) {
          updates[`socialLinks.custom.${(key, value)}`];
        }
      }

      updates[`socialLinks.${platform}`] = value;
    }

    return await UserProfile.updateOne({ _id: id }, { $set: updates });
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

  async find(params) {
    return await UserProfile.findOne(params);
  }
}

export default UserProfileRepository;
