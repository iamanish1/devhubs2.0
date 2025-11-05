import { User } from "../models/userSchema.js";

class userRepository {
  async create(userData) {
    return await User.create(userData);
  }

  async findByEmail(email) {
    return await User.findOne({ email }).select("+password");
  }

  async findAll() {
    return await User.find();
  }

  async deleteById(id) {
    return await User.findByIdAndDelete(id);
  }

  async update(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
  }

  async findById(id) {
    return await User.findById(id);
  }

  async findByUserName(username) {
    return await User.findOne({ username });
  }
}

export default userRepository;
