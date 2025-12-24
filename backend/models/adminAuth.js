import jwt from "jsonwebtoken"; 

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Please login again.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error("adminAuth error:", error);
    res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default adminAuth;
