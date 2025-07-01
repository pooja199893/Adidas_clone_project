import express from "express";
import dotenv from "dotenv";
// import "./passportConfig.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import AllRoutes from "./routes/index.js"
import session from 'express-session';
import passport from "passport";
const app = express();
app.use(cookieParser());
app.use(morgan("combined"));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
dotenv.config();
app.use(express.json());

app.use(session({
  secret: 'MYSECRETKEY',
  resave: false,
  saveUninitialized: false,
  cookie: {
  secure: false, //Use false for local development
  sameSite: 'Lax' // Or 'None' with secure: true in production
}
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", function (req, res) {
  res.send("working.");
});

app.use("/api/v1", AllRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected."));

app.listen(process.env.PORT_NUMBER, () => {
  console.log(`Server is running on port ${process.env.PORT_NUMBER}.`);
});