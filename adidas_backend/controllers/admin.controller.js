import Admin from "../models/admin.model.js";
import Product from "../models/product.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const LoginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body?.adminData;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "All fields are required." });
    }

    const isAdminExists = await Admin.findOne({ email });
    if (!isAdminExists) {
      return res.status(404).json({ success: false, error: "Email not found." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, isAdminExists.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, error: "Password is incorrect." });
    }

    const adminData = {
      name: isAdminExists.name,
      email: isAdminExists.email,
      role: "admin",
      userId: isAdminExists._id,
    };

    // Sign JWT token
    const token = jwt.sign(
      { adminId: isAdminExists._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // set to true in production
      sameSite: "Strict",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      adminData,
    });
  } catch (error) {
    console.error("LoginAdmin Error:", error);
    return res.status(500).json({ success: false, error: "Server error." });
  }
};

export const RegisterAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body.adminData;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: "All fields are required." });
    }

    const isEmailExist = await Admin.findOne({ email });
    if (isEmailExist) {
      return res.status(409).json({
        success: false,
        error: "Email already exists, please use another one.",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: encryptedPassword,
    });

    await newAdmin.save();

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
    });
  } catch (error) {
    console.error("RegisterAdmin Error:", error);
    return res.status(500).json({ success: false, error: "Server error." });
  }
};

export const LogoutAdmin = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.error("LogoutAdmin Error:", error);
    return res.status(500).json({ success: false, error: "Server error." });
  }
};

export const YourAddedProducts = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.json({ success: false, error: "User ID is required." });
    }

    const products = await Product.find({ creatorId: userId });

    return res.json({ success: true, products });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error, success: false });
  }
};
