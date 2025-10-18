import UserProfileServices from "../../services/userProfileServices.js";


const userProfileServices = new UserProfileServices();

export const profileSocialUpdate = async(req,res)=>{
    const id = req.userId;
    const {socialLinks} = req.body;

    try {
        const profile = await userProfileServices.getOne({ userId: id });
        if(!profile){
            return res.status(404).json({
                success:false,
                message:"No profile found"
            })
        }
     const updatedSocial = await userProfileServices.updateSocialLinks(profile._id,socialLinks);
     console.log("updateSocial is coming here",updatedSocial);
     return res.status(200).json({
        success:true,
        message:"Social Links updated"
     })
    } catch (error) {
        return res.status(500).json({
           
            success:false,
            message:error.message

        })
    }

}