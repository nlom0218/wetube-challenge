import routes from "./routes";

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;

  // fake info
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};
