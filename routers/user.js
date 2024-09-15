import express from "express";
import User from "../models/user.js";
import { UserRepository } from "../repositories/userRepository.js";
const router = express.Router();

const timeLog = (req, res, next) => {
  next();
};

router.use(timeLog);

router.get("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const usuarios = await User.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const { username, password, email } = req.body;
    const user = await UserRepository.create({ username, password, email });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { username, password } = req.body;
  try {
    const user = await UserRepository.login({ username, password });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/logout", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const usuarios = await User.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/protected", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const usuarios = await User.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
