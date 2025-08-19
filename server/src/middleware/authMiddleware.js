import jwt from "jsonwebtoken";
import User from "../models/user";

export async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-passwordHash");
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
}
