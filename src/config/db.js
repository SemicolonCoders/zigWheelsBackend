// Import the dotenv module and load environment variables
import dot from "dotenv";
dot.config();

// Import mongoose for MongoDB interaction
import mongoose from "mongoose";

// Function to connect to MongoDB database
const connectDB = async () => {
    try {
        // Connect to MongoDB using the MONGODB_URI environment variable
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");
    } catch (error) {
        // Handle errors if connection fails
        console.log("Error connecting to DB", error);
    }
}

// Export the connectDB function
export default connectDB;
