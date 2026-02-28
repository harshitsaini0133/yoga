import { verifyToken } from "../utils/jwt.js";

export const verifyAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("token is", token);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id, role } = verifyToken(token);
    req.user = { id, role };
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
