import { Router } from "express";
import {
  createUser,
  viewAllUsers,
  viewOneUser,
} from "../controller/userController";

const router: Router = Router();

router.route("/register").post(createUser);
router.route("/get-users").get(viewAllUsers);
router.route("/get-one-user/:userID").get(viewOneUser);
export default router;
