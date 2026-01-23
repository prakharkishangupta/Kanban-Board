import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next(); // 🔥 allow preflight
  }
  const token = req.cookies.token;
  console.log("Auth Middleware Token:", token);
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    console.log("Authenticated User ID:", req.userId);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
