import express from "express";

// Controllers
import { join, login, logout } from "../controllers/userController";
import { home, search } from "../controllers/videoController";

// routes
import routes from "../routes";

const globalRouter = express.Router();

// videoController
globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

// userController
globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);

export default globalRouter;
