import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import "./schemas/index";
import "./schemas/Videos";
import "./schemas/Comment";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
