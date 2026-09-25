import mongoose, { Schema } from "mongoose";
import User from "./User";
import { Models } from "openai/resources.js";

const PaymentSchema = new mongoose.Schema({
    userId:{type:String,required:true,ref:User},
    RazorpayOrderId:{type:String,required:true},
    RazorpayPaymentId:{type:String,default:null},
    amount:{type:Number,required:true},
    Status:{type:String,enum:["created","paid","failed"],default:"created"},


},{timestamps:true})

export default mongoose.models.Payment || mongoose.model("Payment",PaymentSchema);

