const jwt = require("jsonwebtoken");

// ✅ Protect middleware (checks if user is logged in)
exports.protect = (req, res, next) => {
  try {
    // Check token in cookie OR in Authorization header
    let token = null;

    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ msg: "Not authorized, no token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role, ... }
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Not authorized, token invalid or expired" });
  }
};

// ✅ Admin-only middleware
exports.admin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ msg: "Not authorized" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Admin access only" });
  }
  next();
};
