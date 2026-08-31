import mongoose,{models} from "mongoose";
//import { unique } from "next/dist/build/utils";

const {Schema,model} = mongoose;

const userSchema = new Schema({
    name:{type:String,required:true,},
    email:{type:String,required:true,},
    image:{type:String,},
    plan:{type:String,enum:["free","pro"],default:"free",},
    tokenLimit:{type:Number,default:0,},
    usageResetDate:{type:Date,default:()=> new Date()},
    razorpayPaymentId:{type:String,default:null,},
    razorpayOrderId:{type:String,default:null,},

},{timestamps:true})

export default mongoose.models.User || mongoose.model("User",userSchema);