import User from "../models/auth.model.js";
import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new user
export const Register = async (req, res) => {
  try {
    const { email, password } = req.body.userData;
    if (!email || !password) {
      return res.json({ success: false, error: "All fields are required." });
    }

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res.json({
        success: false,
        error: "Email already exists, please use another one.",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: encryptedPassword,
    });

    await newUser.save();

    return res.json({
      success: true,
      message: "Registration successful.",
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.json({ success: false, error: "Server error" });
  }
};

// Login
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, error: "All fields are required." });
    }

    const isUserExists = await User.findOne({ email });
    if (!isUserExists) {
      return res.json({ success: false, error: "Email not found." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, isUserExists.password);
    if (!isPasswordCorrect) {
      return res.json({ success: false, error: "Password is incorrect." });
    }

    const userData = {
      email: isUserExists.email,
      role: "user",
      userId: isUserExists._id,
    };

    const token = jwt.sign({ userId: isUserExists._id, role: "user" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.json({
      success: true,
      message: "Login successful.",
      userData,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.json({ success: false, error: "Server error" });
  }
};

// Get Current User (admin or user)
export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ success: false, error: "No token provided." });

    const data = jwt.verify(token, process.env.JWT_SECRET);

    if (data?.adminId) {
      const admin = await Admin.findById(data.adminId);
      if (!admin) return res.json({ success: false });
      const adminData = {
        name: admin.name,
        email: admin.email,
        role: "admin",
        userId: admin._id,
      };
      return res.json({ success: true, userData: adminData });
    }

    if (data?.userId) {
      const user = await User.findById(data.userId);
      if (!user) return res.json({ success: false });
      const userData = {
        name: user.name || "",
        email: user.email,
        role: "user",
        userId: user._id,
      };
      return res.json({ success: true, userData });
    }

    return res.json({ success: false });
  } catch (error) {
    console.error("getCurrentUser Error:", error);
    return res.json({ success: false, error: "Invalid or expired token." });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const token = req.cookies.token;
    const { name, email } = req.body;

    if (!name || !email) {
      return res.json({ success: false, error: "All fields are required." });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (!data?.userId) {
      return res.json({ success: false, error: "User not authenticated." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      data.userId,
      { name, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.json({ success: false, error: "Profile update failed." });
    }

    return res.json({ success: true, message: "Profile updated successfully." });
  } catch (error) {
    console.error("UpdateProfile Error:", error);
    return res.json({ success: false, error: "Server error" });
  }
};

// Logout
export const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.json({ success: false, error: "Server error" });
  }
};

// Get all users (for admin dashboard)
export const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email _id");
    return res.json({ success: true, users });
  } catch (error) {
    console.error("GetAllUsers Error:", error);
    return res.json({ success: false, error: "Server error" });
  }
};
