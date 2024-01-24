import { Request, Response } from "express";
import userModel from "../model/userModel";
import blogModel from "../model/blogModel";
import { stream } from "../utils/stream";
import { Types } from "mongoose";

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { title, content, category } = req.body;

    const user = await userModel.findById(userID);

    const { secure_url, public_id }: any = await stream(req);

    if (user) {
      const blog = await blogModel.create({
        authorName: user.fullName,
        title,
        content,
        category,
        displayImage: secure_url,
        displayImageID: public_id,
      });

      user?.blogs.push(new Types.ObjectId(blog._id));
      user.save();

      return res.status(201).json({
        message: "Blog created",
        data: blog,
        status: 201,
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "Error creating Blog",
      data: error.message,
      status: 404,
    });
  }
};

export const viewAllBlogs = async (req: Request, res: Response) => {
  try {
    const user = await blogModel.find();
    return res.status(200).json({
      message: "finding all blog",
      data: user,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error finding all blog",
      status: 404,
    });
  }
};

export const viewOneUserBlog = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const blog = await userModel.findById(userID).populate({
      path: "blogs",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res.status(200).json({
      message: "finding one user's blog",
      data: blog,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error finding one user",
      status: 404,
    });
  }
};
