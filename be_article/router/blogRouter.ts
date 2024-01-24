import { Router } from "express";
import {
  createBlog,
  viewAllBlogs,
  viewOneUserBlog,
} from "../controller/blogController";
import multer from "multer";
const upload = multer().single("upload");

const router: Router = Router();

router.route("/create-blog/:userID").post(upload, createBlog);
router.route("/view-my-blog/:userID").get(viewOneUserBlog);
router.route("/view-all-blogs/").get(viewAllBlogs);

export default router;
