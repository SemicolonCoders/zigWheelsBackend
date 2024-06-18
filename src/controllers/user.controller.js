// Import the User model from the user.model.js file
import User from '../models/user.model.js';
// Import the createToken function from the jwt.js file
import { createToken } from '../utilities/jwt.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     NewUser:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

// Define the register controller function
const register = async (req, res) => {
  try {
    // Destructure the name, email, and password from the request body
    const { name, email, password } = req.body;
    console.log(name, email, password);

    // Create a new user in the database
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    console.log(user);

    // Send a success response
    return res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    // Send an error response if registration fails
    return res.status(500).send({ message: 'Error registering user', error: error.message });
  }
};

// Define the login controller function
const login = async (req, res) => {
  try {
    // Destructure the email and password from the request body
    const { email, password } = req.body;

    // Find the user by email in the database
    const user = await User.findOne({ email });
    if (!user) {
      // Send an error response if the user is not found
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    // Check if the password matches
    const passwordMatch = await user.matchPassword(password);
    if (!passwordMatch) {
      // Send an error response if the password is incorrect
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    // Create a JWT token for the user
    const token = createToken({ id: user._id });

    // Set the authToken cookie in the response
    res.cookie('authToken', token, {
      path: '/',
      expires: new Date(Date.now() + 3600000), // Cookie expiration time
      secure: true, // Secure flag for HTTPS
      httpOnly: true, // HTTP only flag
      sameSite: 'None', // SameSite attribute
    });

    // Send a success response with the token and user email
    return res.status(200).send({ message: 'User logged in successfully', token, user: { email: user.email } });
  } catch (error) {
    // Log the error to the console
    console.log(error);
    // Send an error response if login fails
    return res.status(500).send({ message: 'Error in logging the user', error: error.message });
  }
};

// Define the logout controller function
const logout = async (req, res) => {
  // Clear the authToken cookie
  res.clearCookie('authToken');

  // Send a success response
  return res.status(200).send({ message: 'User logged out successfully' });
};

// Define the deleteUser controller function
const deleteUser = async (req, res) => {
  try {
    // Log the authenticated user's information
    console.log(req.user);

    // Destructure the id from the request parameters
    const { id } = req.params;

    // Find and delete the user by id in the database
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      // Send an error response if the user is not found
      return res.status(404).send({ message: 'User not found' });
    }

    // Send a success response if the user is deleted
    return res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    // Send an error response if deletion fails
    return res.status(500).send({ message: 'Error in deleting the user', error: error.message });
  }
};

// Export the register, login, logout, and deleteUser controller functions
export { register, login, logout, deleteUser };

// Example JSON data for testing the register function
// {
//   "name": "Pragati Srivastava",
//   "email": "pragatis924@gmail.com",
//   "password": "PragatiSrivastava"
// }
