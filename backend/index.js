import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './DB/connectDB.js';

import authRoutes from './Routes/auth.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // To parse the incoming requests with JSON payloads

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port: ", PORT);
});