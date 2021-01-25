export const join = (req, res) => res.render("join", { pageName: "Join" });
export const login = (req, res) => res.send("login");
export const logout = (req, res) => res.send("logout");
export const users = (req, res) => res.send("users");
export const editProfile = (req, res) => res.send("editProfile");
export const changePassword = (req, res) => res.send("changePassword");
export const userDetail = (req, res) => res.send("userDetail");
