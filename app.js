import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { localMiddleware } from "./middlewares";

// routes 주소를 변수로 담은 객체 파일 불러오기
import routes from "./routes";

// router
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

// view engine set(pug)
app.set("view engine", "pug");

// middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json()); // body-parser 기능
app.use(express.urlencoded({ extended: true })); // body-parser 기능
app.use(cookieParser());
app.use(localMiddleware);

// route
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
