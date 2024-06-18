// Import the User model from the user.model.js file
import User from "../models/user.model.js";
// Import the verifyToken function from the jwt.js file
import { verifyToken } from "../utilities/jwt.js";

// Define the authentication middleware function
const authentication = async (req, res, next) => {
    try {
        // Retrieve the authToken cookie from the request
        const token = req.cookies.authToken;
        
        // If no token is found, send a 401 Unauthorized response
        if (!token) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        
        // Verify the token and decode its contents
        const decoded = verifyToken(token);
        
        // Find the user by ID from the decoded token
        const user = await User.findById(decoded.id);
        
        // Attach the user object to the request object
        req.user = user;
        
        // Call the next middleware function in the stack
        next();
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error response
        return res.status(500).send({ message: "Error in authorizing the user", error: error.message });
    }
}

// Export the authentication middleware function
export {
    authentication
}
