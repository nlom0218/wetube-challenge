import express from "express";

// Controllers
import {
  getJoin,
  getLogin,
  logout,
  postJoin,
  postLogin,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { isLogout } from "../middlewares";

// routes
import routes from "../routes";

const globalRouter = express.Router();

// videoController
globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

// userController
globalRouter.get(routes.join, isLogout, getJoin);
globalRouter.post(routes.join, isLogout, postJoin, postLogin);

globalRouter.get(routes.login, isLogout, getLogin);
globalRouter.post(routes.login, isLogout, postLogin);

globalRouter.get(routes.logout, logout);

export default globalRouter;
