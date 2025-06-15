import { Router } from "express";
import { GetAllUsers, getCurrentUser, Login, Logout, Register, updateProfile } from "../controllers/auth.controller.js";
import express from "express";
import passport from "passport";

const router = Router();
router.post("/register",Register);
router.post("/login",Login);
router.post("/update-profile",updateProfile);
router.get('/get-current-user', getCurrentUser)
router.post("/logout",Logout);
router.get('/users', GetAllUsers); 

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login/failed" }),
  (req, res) => {
    // Successful login, issue JWT cookie and redirect or send user info
    const user = req.user;
    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.redirect("http://localhost:3000"); // Redirect to your frontend home/dashboard
  }
);

// Facebook OAuth login
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login/failed" }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.redirect("http://localhost:3000");
  }
);

// Apple OAuth login (requires your Apple developer setup)
router.get("/apple", passport.authenticate("apple"));
router.post(
  "/apple/callback",
  passport.authenticate("apple", { failureRedirect: "/login/failed" }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.redirect("http://localhost:3000");
  }
);

export default router;