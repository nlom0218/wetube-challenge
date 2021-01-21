import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const app = express();

const PORT = 4000;

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);
const handleHome = (req, res) => res.send("Hello form my Ass");
const handleProfile = (req, res) => res.send("It's my Profile");

// middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json()); // body-parser 기능
app.use(express.urlencoded({ extended: true })); // body-parser 기능
app.use(cookieParser());

app.get("/", handleHome);
app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
