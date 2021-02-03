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

// routes
import routes from "../routes";

const globalRouter = express.Router();

// videoController
globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

// userController
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);

export default globalRouter;
