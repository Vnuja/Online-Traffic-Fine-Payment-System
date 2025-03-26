import express from "express";
import { registerAdmin, loginAdmin, getAllAdmins, updateAdmin, deleteAdmin } from "../Controllers/adminController.js";
import { check } from "express-validator";
import { protectAdmin } from "../middleware/authMiddleware.js";

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
router.get("/", protectAdmin, getAllAdmins);
router.put("/:id", protectAdmin, updateAdmin);
router.delete("/:id", protectAdmin, deleteAdmin);

export default router;
