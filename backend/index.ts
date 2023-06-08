import express from "express";
import { PORT, MONGODB_URL } from "./utils/envConfig";
import router from "./routes/authRoutes";
import mongoose from "mongoose";
import bodyParser from "body-parser";

mongoose
  .connect(MONGODB_URL!)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) =>
    console.error("Error connecting to MongoDB:", error.message)
  );

const app = express();
app.use(bodyParser.json());

app.use(router);

app.listen(PORT, () => console.log(`port ${PORT} started`));
