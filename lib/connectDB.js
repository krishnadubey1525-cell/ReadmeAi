import "server-only";
import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        if(mongoose.connection.readyState>=1){
            return;
        }
      
    const conn = await mongoose.connect(process.env.MONGODB_URI);
        
  
    console.log(`connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
        
    }
}

export default connectDB;