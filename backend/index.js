import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './DB/connectDB.js';
import authRoutes from './Routes/auth.route.js';
import adminRoutes from './Routes/adminRoutes.js';

dotenv.config();

// Connect to Database first
// connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database first
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Database connection failed:", error);
  process.exit(1);
});

// Middleware
app.use(cors({
    origin: "http://localhost:5175",  // Allow only the frontend origin
    credentials: true, // Allow cookies and authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
  
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
