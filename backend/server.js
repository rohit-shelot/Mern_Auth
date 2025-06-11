const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mainRouter = require("./router/mainRouter.js");
const DB_conn = require("./Db_conn.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", mainRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

DB_conn()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

module.exports = app;
