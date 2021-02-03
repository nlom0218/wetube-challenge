import routes from "../routes";

export const getJoin = (req, res) => {
  res.render("join", { pageName: "Join" });
};

export const postJoin = (req, res) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400).render("join", { pageName: "Join" });
  } else {
    // To Do: Register User
    // To Do: Log user in
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageName: "Login" });
};

export const postLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  // To Do: Process Log Out
  res.redirect(routes.home);
};

export const users = (req, res) => res.send("users");

export const editProfile = (req, res) => {
  res.render("editProfile", { pageName: "Edit Profile" });
};

export const changePassword = (req, res) => {
  res.render("changePassword", { pageName: "Change Password" });
};

export const userDetail = (req, res) => {
  console.log(req.params.id);
  res.render("userDetail", { pageName: "Profile" });
};
