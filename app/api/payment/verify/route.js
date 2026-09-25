import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "@/lib/connectDB";
import Readme from "@/models/Readme";
import Payment from "@/models/Payment";
import User from "@/models/User";
import razorpay from "@/lib/razorpay";
import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req){
    try {
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({success:false, message:"user not found"});

        }
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = await req.json();

        const secret = process.env.RAZORPAY_KEY_SECRET ;

      //   const generated_signature = hmac_sha256(RazorpayOrderId + "|" + RazorpayPaymentId, secret);

         const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

//     console.log("Order ID:", razorpay_order_id);
// console.log("Payment ID:", razorpay_payment_id);
// console.log("Received Signature:", razorpay_signature);
// console.log("Generated Signature:", generated_signature);


         if (generated_signature !== razorpay_signature) {
         return NextResponse.json({success:false,message:"wrong Signature"})
 
        }


        await connectDB();

        await Payment.findOneAndUpdate({razorpay_order_id},{
            razorpay_payment_id, status:"paid"
        })

        await User.findOneAndUpdate({email:session.user.email},{
            plan:"pro",
            razorpay_order_id,
            razorpay_payment_id,

        })

        return NextResponse.json({
            success:true,
            message:"upgraded to pro plan",
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"payment verification failed"
        })
    }
}
