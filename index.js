// Import necessary modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js'; // Import the database connection function
import userRouter from './src/routes/user.routes.js'; // Import the user routes
import cookieParser from 'cookie-parser'; // Import the cookie-parser middleware
import setupSwaggerDocs from './swagger.js'; // Import the default export from swagger.js

// Load environment variables from .env file
dotenv.config();

const app = express();

// Updated CORS options to include both local and deployed frontend URLs
const corsOptions = {
  origin: [
    'http://localhost:5173', // Local development URL
    'https://zig-wheels-frontend.vercel.app', // Deployed frontend URL
  ],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 200, // Set the status for successful OPTIONS requests
};

// Use the CORS middleware with the specified options
app.use(cors(corsOptions));

// Middlewares
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies in request headers

// Routes
app.use('/api/user', userRouter); // Mount the user routes at /api/user

// Swagger setup
setupSwaggerDocs(app); // Set up Swagger documentation

// Define a simple route for the root URL
app.get('/', (req, res) => {
  res.status(200).send('Welcome to ZigWheels!!!');
});

// Define the port from environment variables or use 8000 as default
const PORT = process.env.PORT || 8000;

// Connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
  });
