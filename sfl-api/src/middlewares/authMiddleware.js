require('dotenv').config(); 
const jwt = require("jsonwebtoken");
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization") && req.header("Authorization").split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied, token not provided" });
  }

  try {
    console.log('JWT Secret Key:', process.env.JWT_SECRET_KEY);
    
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = verified.userId; 
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = { authenticateUser };
