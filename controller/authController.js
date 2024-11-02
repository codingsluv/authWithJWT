import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';


const getToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_TOKEN), {
        expiresIn: '6d',
    }
}

const createResponseToken = (user, statusCode, res) => {
    const token = getToken(user._id)
    const cookieOptions = {
        expires: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false,
        // sameSite: 'strict',
        // path: '/',
    }
    res.cookie('jwt', token, cookieOptions);
    user.password = undefined

    res.status(statusCode).json({
        mssg: 'user logged in successfully',
        user
    })
}

export const registerUser = asyncHandler(async (req, res) => {
    const isFirstUser = (await User.countDocuments()) === 0 ? 'admin' : 'user';
    
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: isFirstUser,
    });

    // res.status(201).json({
    //     mssg: 'user created successfully',
    //     user,
    // })   
    createResponseToken(user, 201, res)
})

export const loginUser = asyncHandler(async (req, res) => {
    if(!req.body.email && !req.body.password) {
        res.status(400)
        throw new Error('email or password is missing');
    }
    
    const userData = await User.findOne({ 
        email: req.body.email 
    });

    if(userData && (await userData.comparePassword(req.body.password))) {
          createResponseToken(userData, 200, res)
    } else {
        res.status(401)
        throw new Error('invalid user or user not found');
    }
})

export const findUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if(user) {
        res.status(200).json({
            mssg: 'user found',
            user,
        })
    } else {
        res.status(401).json({
            mssg: 'user not found',
        })
    }
})

export const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        mssg: 'route to logout',
    })
})