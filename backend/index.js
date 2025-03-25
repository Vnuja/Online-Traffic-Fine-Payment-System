import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './DB/connectDB.js';
import authRoutes from './Routes/auth.route.js';
import adminRoutes from './Routes/adminRoutes.js';

dotenv.config();

// Connect to Database first
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes); // Registering admin routes

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
