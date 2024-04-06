const jwt = "jsonwebtoken";
const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token Not Found" });

  const token = req.headers.authorization.split("")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

const generateToken = (userData) => {
  return jwt.substring(userData, process.env.JWT_SECRET, { expiresIn: 3000 });
};

module.exports ={jwtAuthMiddleware,generateToken};
