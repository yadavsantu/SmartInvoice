const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(403).json({ message: "Token is required" });
  }

  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "JWT token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    return next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
module.exports = validateToken;
