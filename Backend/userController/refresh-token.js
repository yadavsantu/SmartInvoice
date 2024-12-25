const jwt = require("jsonwebtoken");

const refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Refresh Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET); // Verify the refresh token

    const newAccessToken = jwt.sign(
      {
        id: decoded.id,
        fullName: decoded.fullName,
        email: decoded.email,
      },
      process.env.SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

module.exports = refreshToken;
