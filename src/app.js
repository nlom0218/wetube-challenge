import "@babel/polyfill";

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import session from "express-session";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import { localMiddleware } from "./middlewares";

// passport 설정파일 실행하기
import "./passport/index";

// routes 주소를 변수로 담은 객체 파일 불러오기
import routes from "./routes";

// router
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";

const app = express();

const CookieStore = MongoStore(session);

// view engine set(pug)
app.set("view engine", "pug");

// middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(express.json()); // body-parser 기능
app.use(express.urlencoded({ extended: true })); // body-parser 기능
app.use(cookieParser());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localMiddleware);

// video 재생 문제 해결 미들웨어
app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://archive.org"
  );
  return next();
});

// route
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
