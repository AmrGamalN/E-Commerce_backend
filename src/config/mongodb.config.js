import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URl);
        console.log("MongoDB connected");
        console.log(mongoose.connection.readyState);
    }
    catch (error) { 
        console.log("MongoDB connection failed", error);
        
    }
}