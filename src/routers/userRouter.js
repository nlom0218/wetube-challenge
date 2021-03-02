import express from "express";

// Controllers
import {
  getEditProfile,
  userDetail,
  getMe,
  postEditProfile,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { isLogin, uploadAvatar } from "../middlewares";

// routes
import routes from "../routes";

const userRouter = express.Router();

// userController
userRouter.get(routes.editProfile, isLogin, getEditProfile);
userRouter.post(routes.editProfile, isLogin, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, isLogin, getChangePassword);
userRouter.post(routes.changePassword, isLogin, postChangePassword);

userRouter.get(routes.me, isLogin, getMe);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
