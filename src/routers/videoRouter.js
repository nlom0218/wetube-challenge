import express from "express";
import { isLogin, uploadVideo } from "../middlewares";

// Controllers
import {
  deleteVideo,
  getEditVideo,
  getUpload,
  postEditVideo,
  postUpload,
  videoDetail,
} from "../controllers/videoController";

// routes
import routes from "../routes";

const videoRouter = express.Router();

// videoController
// Upload Video
videoRouter.get(routes.upload, isLogin, getUpload);
videoRouter.post(routes.upload, isLogin, uploadVideo, postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), isLogin, getEditVideo);
videoRouter.post(routes.editVideo(), isLogin, postEditVideo);

// Delete Video
videoRouter.get(routes.deleteVideo(), isLogin, deleteVideo);

export default videoRouter;
