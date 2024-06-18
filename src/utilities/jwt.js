// Import the jwt module
import jwt from "jsonwebtoken";

// Function to create a token with provided data
const createToken = (data) => {
    // Sign the data with the secret key and set expiration time to 1 day
    return jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d"
    });
}

// Function to verify a token
const verifyToken = (token) => {
    // Verify the token with the secret key
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

// Export the createToken and verifyToken functions
export {
    createToken,
    verifyToken
}
