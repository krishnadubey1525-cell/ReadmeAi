import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "@/lib/connectDB";
import Readme from "@/models/Readme";

export async function GET(req,{params}){
    try {
        
        const session = await getServerSession(authOptions);
        if(!session){
           return Response.json({error:"not logged in"});
        }
        await connectDB();

        const {id} = await params;
    
        const readme = await Readme.findById(id);
    
        if(!readme){
            return Response.json({error :"not found"});
        }
        
        return Response.json({readme})
        
    } catch (error) {
        console.error(error)
    }



}