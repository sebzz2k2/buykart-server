import { Request, Response } from "express";


import { UserModel } from "../database/users/user.model";
import jwt from "jsonwebtoken";
import { compareSync, hashSync } from "bcrypt";



// create a salt for the user
const generateSalt = async (id: string) => {
    return jwt.sign({ id }, "stringABCC", { expiresIn: "1d" });
};

// register a new user
export const registerUser = async (req: Request, res: Response) => {
    // const db = connect();
    const { userName, password, email, isUser } = req.body;
    // check if all fields are filled
    if (!userName || !password || !email || !isUser) {
        return res.status(400).json({
            status: "fail",
            message: "Please provide all required fields",
        });
    }

    // check if user already exists
    const userExists = await UserModel.findOne({ userName });
    if (userExists) {
        return res.status(400).json({
            status: "fail",
            message: "User already exists",
        });
    }


    // create a new user
    const newUser = await UserModel.create({
        userName,
        isUser,
        email,
        password: hashSync(password, 10),
    });


    //return the user as json
    if (newUser) {
        return res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: {
                userName: newUser.userName,
                email: newUser.email,
                isUser,
                _id: newUser._id,
            },
            token: `Bearer ${await generateSalt(newUser._id as unknown as string)}`,


        });
    } else {
        return res.status(400).json({
            status: "fail",
            message: "User not created",
        });
    }
};

// login a user
export const loginUser = async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    // check if all fields are filled
    if (!userName || !password) {
        return res.status(400).json({
            status: "fail",
            message: "Please provide all required fields",
        });
    }

    // check if user exists
    const user = await UserModel.findOne({ userName });
    if (!user) {
        return res.status(400).json({
            status: "fail",
            message: "User does not exist",
        });
    }

    // check if password is correct for the user
    if (!compareSync(password, user.password)) {
        return res.status(400).json({
            status: "fail",
            message: "Password is incorrect",
        });
    } else {
        return res.status(200).json({
            status: "success",
            message: "User logged in successfully",
            data: {
                userName: user.userName,
                email: user.email,
                _id: user._id,
            },
            token: `Bearer ${await generateSalt(user._id as unknown as string)}`,
        });
    }
};

// get a user
export const getUser = async (req: Request, res: Response) => {
    // get the user id from middleware

    const user = await UserModel.findById(req.user as Request);

    // check if user exists
    if (!user) {
        return res.status(400).json({
            status: "fail",
            message: "User not found",
        });
    } else {
        return res.status(200).json({
            status: "success",
            message: "User found",
            data: {
                userName: user.userName,
                isUser: user.isUser,
                _id: user._id,
                email: user.email
            },
        });
    }
};

// update a user
export const updateUser = async (req: Request, res: Response) => {
    const { userName, currentPassword, isUser, newPassword, email } = req.body;
    // get the user id from middleware
    const user = await UserModel.findById(req.user as Request);
    // check if user exists and if the fields are filled
    if (!user || !userName || !currentPassword || !isUser || !email) {
        return res.status(400).json({
            status: "fail",
            message: "Please fill the required fields",
        });
    }
    else {
        // check if the password is correct
        if (!compareSync(currentPassword, user.password)) {
            return res.status(400).json({
                status: "fail",
                message: "Password is incorrect",
            });
        } else {
            const updatedUser = await UserModel.findByIdAndUpdate(
                user._id,
                {
                    userName,
                    password: hashSync(newPassword, 10),
                    isUser, email
                },
                { new: true }
            );
            // return the updated user
            return res.status(200).json({
                status: "success",
                message: "User updated successfully",
                data: {
                    userName: updatedUser?.userName,
                    isUser: updatedUser?.isUser,
                    _id: updatedUser?._id,
                    email: updatedUser?.email
                },
            });
        }
    }
}


// delete a user
export const deleteUser = async (req: Request, res: Response) => {
    // get the user id from middleware
    const user = await UserModel.findById(req.user as Request);
    // check if user exists
    if (!user) {
        return res.status(400).json({
            status: "fail",
            message: "User not found",
        });
    } else {
        // delete the user
        const deletedUser = await UserModel.findByIdAndDelete(user._id);
        // return the deleted user
        return res.status(200).json({
            status: "success",
            message: "User deleted successfully",
            data: {
                userName: deletedUser?.userName,
                isUser: deletedUser?.isUser,
                _id: deletedUser?._id,
            },
        });
    }
};


