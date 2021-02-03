import express from "express";

// Controllers
import {
  changePassword,
  editProfile,
  userDetail,
  users,
} from "../controllers/userController";

// routes
import routes from "../routes";

const userRouter = express.Router();

// userController
userRouter.get(routes.users, users);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
