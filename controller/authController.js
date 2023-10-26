import mongoose from "mongoose";
import userModel from "../models/userModel.js"
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import jwt from 'jsonwebtoken';

export const registrationController = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if (!name)
            return res.send({ error: "name is required" });
        else if (!email)
            return res.send({ error: "email is required" });
        else if (!password)
            return res.send({ error: "password is required" });

        // existing use check

        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(200).send({
                success: true,
                message: "user already exist, please login"
            });
        }

        // create user
        const hashedPass = await hashPassword(password)
        const newUser = new userModel({
            name, email,
            password:hashedPass
        });
        await newUser.save();

        return res.status(201).send({
            success: true,
            message: "user created successfully",
            newUser
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error while adding new user",
            error
        });
    }
}

export const loginController = async (req, res) => {
    try {
        
        const{ email, password } = req.body;
        
        if (!email || !password){
            return res.send({
                success: false,
                error: "All fields are are required"
            });
        }
        // check to see if user is registered
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(202).send({
                success: false,
                message: "User not registered, please register first"
            });  
        }

        const match = await comparePassword(password, user.password);
            if(!match){
                return res.status(200).send({
                success: false,
                message: "Invalid credentials, please try again",
            });
        }

        const token = jwt.sign({_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn: '2d'}
            );
        
        return res.status(200).send({
            success: true,
            message: "user logged in successfully",
            user: {
                name: user.name,
                email: user.email
            },
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error while logging in",
            error
        })
    }
}
