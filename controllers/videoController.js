import { videos } from "../db";
import routes from "../routes";

export const home = (req, res) => {
  res.render("home", { pageName: "Home", videos });
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", { pageName: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageName: "Upload" });

export const postUpload = (req, res) => {
  const {
    body: { video, title, description },
  } = req;
  // To Do: Upload and save video
  res.redirect(`/videos${routes.videoDetail(324393)}`);
};

export const videoDetail = (req, res) => res.send("videoDetail");

export const editVideo = (req, res) => {
  res.render("editVideo", { pageName: "Edit Video" });
};

export const deleteVideo = (req, res) => res.send("deleteVideo");
