import express from "express";

// Controllers
import {
  deleteVideo,
  editVideo,
  getUpload,
  postUpload,
  videoDetail,
} from "../controllers/videoController";

// routes
import routes from "../routes";

const videoRouter = express.Router();

// videoController
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;
