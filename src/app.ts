import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import swaggerDocs from "./utils/swagger";
const router = require("./routes");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", router);
// Swagger Docs
swaggerDocs(app);

export default app;
