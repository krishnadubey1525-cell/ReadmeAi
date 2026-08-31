import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import Readme from "@/models/Readme";

export async function GET(){

    try {
       const session = await getServerSession(authOptions);
       if(!session){
            return Response.json({error:"Not logged in"}, {status:401});
       }
       await connectDB();
        const user = await User.findOne({email:session.user.email})
        const readmes = await Readme.find({userId:user._id}).sort({createdAt:-1}).limit(8);
        return Response.json({readmes})
    } catch (error) {
        return Response.json({ error: "Something went wrong" }, { status: 500 })
    }
}