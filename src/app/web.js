import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "../config/corsOptions.js";
import { errorMiddleware } from "../middleware/errorMiddleware.js";
import { logger } from "../middleware/logger.js";
import { userRouter } from "../routes/userApi.js";
import { tutorRouter } from "../routes/tutorApi.js";

dotenv.config();
export const web = express();
web.use(logger);
web.use(cors(corsOptions));
web.use(cookieParser());
web.use(express.urlencoded({ extended: true }));
web.use(express.json());
web.get("/", (req, res) => {
  res.send("OK!");
});
web.use(userRouter);
web.use(tutorRouter);
web.use(errorMiddleware);
