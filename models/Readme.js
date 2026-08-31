import mongoose, { model } from "mongoose";    
import User from "./User";

const ReadmeScheme = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:User},
    repoName:{type:String,required:true},
    repoURL:{type:String,required:true},
    content:{type:String,required:true},
},{timestamps:true})

export default mongoose.models.Readme || mongoose.model("Readme", ReadmeScheme);