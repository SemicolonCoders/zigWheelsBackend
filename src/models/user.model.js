// Import mongoose for database interaction
import mongoose from "mongoose";
// Import bcrypt for password hashing
import bcrypt from "bcryptjs";

// Define the user schema
const userSchema = new mongoose.Schema(
    {
        name : {type : String, required: true}, // Name field, required
        email : {type: String, required: true, unique: true}, // Email field, required and unique
        password: {type: String, required: true}, // Password field, required
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
        versionKey: false // Disable the version key (__v)
    }
)

// Pre-save middleware to hash the password before saving
userSchema.pre("save", async function(next) {
    // If the password is not modified, move to the next middleware
    if (!this.isModified('password')) {
        next();
    }
    try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSaltSync(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        // Log any errors and move to the next middleware
        console.log("Error hashing password", error);
        next(error);
    }
})

// Method to compare entered password with the hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compareSync(enteredPassword, this.password);
}

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

// Export the User model
export default User;
