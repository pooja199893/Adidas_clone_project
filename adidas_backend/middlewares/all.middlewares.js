import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";
import Admin from "../models/admin.model.js";
export async function checkIsUserValid(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, error: "No token provided." });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET);

    if (data.role !== "user") {
      return res.status(403).json({ success: false, error: "Access denied. Not a user." });
    }

    const user = await User.findById(data.userId);
    if (!user) {
      return res.status(403).json({ success: false, error: "User not valid." });
    }

    req.userId = data.userId;
    req.role = data.role;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, error: "Invalid or expired token." });
  }
}


export async function checkIsAdminValid(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, error: "No token provided." });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET);

    if (data.role !== "admin") {
      return res.status(403).json({ success: false, error: "Access denied. Not an admin." });
    }

    const admin = await Admin.findById(data.adminId);
    if (!admin) {
      return res.status(403).json({ success: false, error: "Admin not valid." });
    }

    req.userId = data.adminId;
    req.role = data.role;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, error: "Invalid or expired token." });
  }
}
