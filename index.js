import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import userRouter from './src/routes/user.routes.js';
import cookieParser from 'cookie-parser';
import setupSwaggerDocs from './swagger.js'; // Import the default export from swagger.js

dotenv.config();

const app = express();

// Updated CORS options to include both local and deployed frontend URLs
const corsOptions = {
  origin: [
    'http://localhost:5173', // Local development URL
    ' http://zig-wheels-frontend.vercel.app', // Deployed frontend URL
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', userRouter);

// Swagger setup
setupSwaggerDocs(app);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to ZigWheels!!!');
});

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
  });
