import mongoose from "mongoose";
import { Schema } from "mongoose";

const projectListingSchema = new Schema({
     project_Title : {
        type : String,
        required : [true, "Project Title is required"],
        trim : true,
        minLength : [3, "Project Title should be more than 3 chars"],
        maxLength : [100, "Project Title should be less than 100 chars"],
     }, 
     project_Starting_Bid : {
        type : Number,
        required : [true , "Project Starting Bid is required"],
        min : [100, "Project Starting Bid should be more than 100"],
     }, 
     project_Starting_Date : {
        type : Date,
        required : [true, "Project Starting Date is required"],
     }, 
     project_Ending_Date : {
        type : Date,
        required : [true, "Project Ending Date is required"],
     }, 
     Number_of_Contributors : {
        type : Number , 
        default : 0,
        min : [0, "Number of Contributors should be more than 0"],
        max : [100, "Number of Contributors should be less than 100"],
     }, 
     project_Technology_Stack : {
        type : [String], 
        required : [true, "Project Technology Stack is required"],
     }, 
     Project_category : {
        type : string , 
        required : [true, "Project Category is required"],
        enum : ["Free project" , "Funded project" , "capsulated project"], 
     }, 
     project_Description : {
        type : String , 
        required : [true, "Project Description is required"],
        trim : true,
        minLength : [10, "Project Description should be more than 10 chars"],
        maxLength : [1000, "Project Description should be less than 1000 chars"],
     }, 
     Project_Key_Features : {
        type : [String], 
        required : [true, "Project Key Features is required"],
        trim : true,
        minLength : [10, "Project Key Features should be more than 10 chars"],
        maxLength : [1000, "Project Key Features should be less than 1000 chars"],
     }, 
     Project_Status : {
        type : String , 
        required : [true, "Project Status is required"],
        enum : ["Active" , "Inactive" , "Completed"], 
     }, 
     Project_Ideal_Member_looking_For : {
        type : [String], 
        required : [true, "Project Ideal Member looking For is required"],
        trim : true,
        minLength : [10, "Project Ideal Member looking For should be more than 10 chars"],
        maxLength : [1000, "Project Ideal Member looking For should be less than 1000 chars"],
     }, 
    Project_github_Repository_Link : {
        type : String,
        required : [true, "Project Github Repository Link is required"],
     }, 
     Project_Cover_Image : {
        type : String,
        required : [true, "Project Cover Image is required"],
     }, 
     Project_Bonus_Per_Contributor : {
        type : Number , 
        default : 0, 
        min : [0, "Project Bonus Per Contributor should be more than 0"],
     }, 

    })

    export const ProjectListing = mongoose.model("ProjectListing", projectListingSchema); 