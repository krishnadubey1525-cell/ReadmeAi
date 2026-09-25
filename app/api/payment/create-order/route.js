import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import Payment from "@/models/Payment";
import razorpay from "@/lib/razorpay";
import { NextResponse } from "next/server";


export async function POST(){
    try {
        const session = await getServerSession(authOptions);
        if(!session){
          return  NextResponse.json({
            success:false,
            message:"user not found"
            })
        }

        await connectDB();

        const user = await User.findOne({email:session.user.email});

        if(user.plan==="pro"){
            return NextResponse.json({
                success:false,
                message:"already have a plan"
            })
        }
        // create order

        const Order = await razorpay.orders.create({
            amount:29900,
            currency:'INR',
            receipt:`receipt_${user._id}`
        })

            // adding at database

        await Payment.create({
            userId:user._id,
            RazorpayOrderId:Order.id,
            amount:29900,
            status:"created"
        })

        return NextResponse.json({
            success:true,
            orderId : Order.id,
            amount : Order.amount,
            currency: Order.currency,
            name : user.name,
            email:user.email,

        })

    } catch (error) {
        console.error("order is not created");
        return NextResponse.json({
            success:false,
            message:"Order not created"
        })
    }
}