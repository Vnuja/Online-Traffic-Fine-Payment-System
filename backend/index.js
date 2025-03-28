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
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],  // Allow frontend origins
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Connect to Database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Database connection failed:", error);
  process.exit(1);
});
