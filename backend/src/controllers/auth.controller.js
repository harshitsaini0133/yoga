import { cookieOptions } from "../config/cookie.config.js";
import {
  register,
  login,
  adminLogin,
  getVerify,
} from "../services/auth.service.js";
import { generateToken } from "../utils/jwt.js";
import { comparePassword } from "../utils/password.js";

export const authController = {
  register: async (req, res) => {
    try {
      const { idToken, name } = req.body;
      console.log(idToken);

      const user = await register(idToken, name);

      const token = generateToken({ id: user.id, role: user.role });
      res.cookie("token", token, cookieOptions);

      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { idToken } = req.body;

      const user = await login(idToken);

      const token = generateToken({ id: user.id, role: user.role });
      res.cookie("token", token, cookieOptions);

      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await adminLogin(email, password);

      if (!user || user.role === "USER") {
        throw new Error("Invalid request");
      }

      if (!(await comparePassword(password, user.password))) {
        throw new Error("Invalid password");
      }

      const token = generateToken({ id: user.id, role: user.role });
      console.log(token);
      res.cookie("token", token, cookieOptions);

      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  getVerify: async (req, res) => {
    try {
      const { email, phNo, otp } = req.body;

      // Get whichever is provided
      const identifier = email || phNo;

      if (!identifier) {
        return res.status(400).json({
          status: false,
          message: "Email or phone number is required",
        });
      }

      const user = await getVerify(identifier, otp);

      const token = generateToken({ id: user.id, role: user.role });

      res.status(200).json({
        message: "Verification successful",
        status: true,
        data: user,
        token,
      });
    } catch (err) {
      console.error(err);

      res.status(400).json({
        status: false,
        error: err.message,
      });
    }
  },
};
