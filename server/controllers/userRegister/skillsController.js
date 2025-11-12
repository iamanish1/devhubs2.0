import UserProfileServices from "../../services/userProfileServices.js";
import { AppError } from "../../utils/appError.js";

const userProfileServices = new UserProfileServices();

export const userSkills = async (req, res) => {
  try {
    const { newSkills } = req.body;
    const id = req.userId;
    if(newSkills.length === 0) {
      return next(new AppError("At least one skill is required"),404);
    }
    const user = await userProfileServices.updateUserSkills(id, newSkills);


    return res.status(200).json({
        success:true,
        message:"Skill updated successfully"
    }) 
  } catch (error) {
   return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
