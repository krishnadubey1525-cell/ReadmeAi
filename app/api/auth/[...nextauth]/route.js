import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from 'next-auth/providers/google';
import connectDB from "@/lib/connectDB";
import User from "@/models/User";
// import mongoose from "mongoose";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
      GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),

        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
    // ...add more providers here
  ],
 callbacks:{
    async signIn({account,user,credentials,profile}){
       try{
            await connectDB();

            const currentuser = await User.findOne({email: user.email})
            if(!currentuser){
                const newuser = await User.create({
                    email:user.email,
                    name: user.name || user.email.split("@")[0],
                     image: user.image,
                })
            }
            return true;
        }
        catch (error) {
    console.error(error);
    return false;
  }


    },
    async session({token,user,session}){
        await connectDB();
        const dbUser = await User.findOne({email:session.user.email});
        if(dbUser){
       //     session.user.id = dbUser._id.toString();
            session.user.name = dbUser.name;
            session.user.email = dbUser.email;
            session.user.plan = dbUser.plan;
            session.user.tokenLimit = dbUser.tokenLimit;
        }
        return session;
    },
 }
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };