import routes from "../routes";
import passport from "passport";
import User from "../schemas/User";
import Videos from "../schemas/Videos";

export const getJoin = (req, res) => {
  res.render("join", { pageName: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400).render("join", { pageName: "Join" });
  } else {
    const user = await User({
      name,
      email,
    });
    await User.register(user, password);
    next();
    try {
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageName: "Login" });
};

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getEditProfile = (req, res) => {
  res.render("editProfile", { pageName: "Edit Profile" });
};

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  console.log(file);
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl,
    });
    res.redirect(`/users${routes.me}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/users${routes.editProfile}`);
  }
};

export const getChangePassword = (req, res) => {
  res.render("changePassword", { pageName: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(`/users${routes.me}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/users${routes.changePassword}`);
  }
};

export const getMe = async (req, res) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user.id).populate("videos");
    res.render("userDetail", { pageName: "Profile", user });
  } catch (err) {
    console.log(err);
    res.redirect(routes.home);
  }
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageName: "Profile", user });
  } catch (err) {
    console.log(err);
    res.redirect(routes.home);
  }
};
