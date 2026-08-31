import { getServerSession } from "next-auth";   
import { authOptions } from "../auth/[...nextauth]/route";
import { geminiModel,buildprompt } from "@/lib/gemini";
import User from "@/models/User";   
import Readme from "@/models/Readme";
import connectDB from "@/lib/connectDB";


export async function POST(req) {
    // check login
    try {
    const session = await getServerSession(authOptions);
    if(!session){
        return Response.json({error:"user not foun"},{status:401})
    }
    await connectDB();

    // find user
    const user = await User.findOne({email:session.user.email})
    //check free limit
    if(user.plan ==="free" && user.tokenLimit>=3){
        return Response.json({
            error:"Free use limit reached"
        },{status:403})
    }
    //get data from req
    const {repoURL,options} = await req.json();
    if(!repoURL){
        return Response.json({error:'URL IS missing '},{status:400})
    }


    // extract repo name from URL
    const repoName = repoURL.split('/').filter(Boolean).pop();

    // BUILD PROMPT AND CALL gemini
    const prompt = buildprompt(repoURL,options);
    const result  = await geminiModel.generateContent(prompt);
    const content = result.response.text();
    //save to mongoDB
    const newReadme = await Readme.create({
        userId : user._id,
        repoName,
        repoURL,
        content,
    })
    // incriment usage count
    await User.findByIdAndUpdate(user._id,{
        $inc:{tokenLimit:1}
    })
    // response to frontend
    return Response.json({content,repoName})
}catch(error){
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 })
    
}


}