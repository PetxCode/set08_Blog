import { Request, Response } from "express";
import userModel from "../model/userModel";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hasled = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      email,
      password: hasled,
    });
    return res.status(201).json({
      message: "creating user",
      data: user,
      status: 201,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error creating user",
      status: 404,
    });
  }
};

export const viewAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();
    return res.status(200).json({
      message: "finding all users",
      data: user,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error finding all user",
      status: 404,
    });
  }
};

export const viewOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);

    let count: number = 0;
    const countValue = {
      email: user?.email,
      fullName: user?.fullName,
      bio: user?.bio,
      address: user?.address,
      phone: user?.phone,
      avatar: user?.avatar,
    };

    const myValue = Object.values(countValue);

    for (let i of myValue) {
      if (i !== undefined) {
        count++;
      }
    }

    return res.status(200).json({
      message: "finding one users",
      data: user,
      count,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error finding one user",
      status: 404,
    });
  }
};
