const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const userRouter = require("./routes/userRoute");
const AppError = require("./utils/appError");
const cors = require("cors");
const portfolioRouter = require("./routes/portfolioRouter");
const jobPostingRouter = require("./routes/jobPostingRouter");
const mediaRouter = require("./routes/mediaRouter");
const fileUpload = require("express-fileupload");

const app = express();
app.use(cors());

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "50mb" }));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 * 1024 },
  })
);

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("static"));

// Data sanitization against NoSQL query` injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use("/api/user", userRouter);
app.use("/api/portfolio", portfolioRouter);
app.use("/api/job-posting", jobPostingRouter);
app.use("/api/upload", mediaRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
