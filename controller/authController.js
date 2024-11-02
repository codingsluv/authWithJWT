import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";

export const registerUser = asyncHandler(async (req, res) => {
    const isFirstUser = (await User.countDocuments()) === 0 ? 'admin' : 'user';
    
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: isFirstUser,
    });

    res.status(201).json({
        mssg: 'user created successfully',
        user,
    })
})