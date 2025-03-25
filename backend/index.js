import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './DB/connectDB.js';

//User
import authRoutes from './Routes/auth.route.js';

//Admin
import adminRoutes from './Routes/adminRoutes.js';

dotenv.config();

// Connect to Database first
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//User Routes
app.use("/api/auth", authRoutes);

//Admin Routes
app.use("/api/admin", adminRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
