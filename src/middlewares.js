import dotenv from "dotenv";
dotenv.config();

import routes from "./routes";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  // if (req.user) {
  //   const {
  //     user: { id },
  //   } = req;
  //   res.locals.loggedUserId = id || null;
  // }
  next();
};

// 로그아웃 상태인 경우에만 접근을 허용
export const isLogout = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

// 로그인 상태인 경우에만 접근을 허용
export const isLogin = (req, res, next) => {
  if (!req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

// aws s3
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2",
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "khd-wetube/video",
  }),
});

const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "khd-wetube/avatar",
  }),
});

export const uploadVideo = multerVideo.single("video");
export const uploadAvatar = multerAvatar.single("avatar");
