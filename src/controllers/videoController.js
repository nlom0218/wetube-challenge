import Video from "../schemas/Videos";
import Comment from "../schemas/Comment";
import routes from "../routes";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: -1 });
    res.render("home", { pageName: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageName: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    }).sort({ createdAt: -1 });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageName: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageName: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file,
  } = req;
  try {
    const newVideo = await Video.create({
      fileUrl: file.location,
      title,
      description,
      creator: req.user.id,
    });
    req.user.videos.push(newVideo);
    req.user.save();
    res.redirect(`/videos${routes.videoDetail(newVideo.id)}`);
  } catch (error) {
    console.log(error);
  }
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    res.render("videoDetail", { pageName: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator == req.user.id) {
      res.render("editVideo", { pageName: `Edit ${video.title}`, video });
    } else {
      throw Error;
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(`/videos/${routes.videoDetail(id)}`);
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator == req.user.id) {
      const deletVideo = await Video.findOneAndDelete({ _id: id });
      // 삭제된 비디오 User videos 배열에서 삭제 구현 필요
    } else {
      throw Error;
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

// Register video views
export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Comment
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(400);
  } finally {
    res.end();
  }
};
