import express from "express";
import { registerAdmin, loginAdmin } from "../Controllers/adminController.js";
import { check } from "express-validator";
import { body, validationResult } from 'express-validator';


const router = express.Router();

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
    check("nic", "Invalid NIC format").matches(/^([0-9]{9}[vVxX]|[0-9]{12})$/),
    check("mobile", "Invalid mobile number").matches(/^[0-9]{10}$/),
  ],
  registerAdmin
);

router.post("/login", loginAdmin);

export default router;
