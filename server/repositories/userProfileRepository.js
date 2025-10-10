import userProfile from "../models/userProfileSchema.js";

class UserProfileRepository {

    async create (data) {
        return await userProfile.create(data);
    }

    async update(id,data){
        return await userProfile.findByIdAndUpdate(id,data);
    }

    async delete(id){
        return await userProfile.findOneAndDelete(id);
    }

    async findById(id){
        return await userProfile.findById(id);
    }

    async findByEmail(id){
        return await userProfile.findOne({email});
    }

    


    


}

export default UserProfileRepository;