import { User } from "../Models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    
    const {firstName, lastName, email, phoneNumber, NICNumber, password} = req.body;

    try {
        if(!firstName || !lastName || !email || !phoneNumber || !NICNumber || !password){
            throw new Error("All fields are required");
        }

        const userAlreadyExists = await User.findOne({email});

        if(userAlreadyExists){
            return res.status(400).json({success: false, message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10); // example input: "1234" -> example output: "$2a$10$3QJ
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            firstName,
            lastName,
            email,
            phoneNumber,
            NICNumber,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        })

        await user.save();

        //jwt
        generateTokenAndSetCookie(res, user._id);

        res.status(201).json({
            success: true, 
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });

    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }

};

export const login = async (req, res) => {
    res.send("login route");
};

export const logout = async (req, res) => {
    res.send("logout route");
};