import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserRepository } from "../repositories/userRepository.js";
import cookieParser from "cookie-parser";
import { PersonRepository } from "../repositories/personRepository.js";
const router = express.Router();
dotenv.config();
const key = process.env.SECRET_JWT_KEY.toString();
/*
router.use((req, res, next) => {
  const token = req.cookies.access_token;
  req.session = { user: null };
  try {
    const data = jwt.verify(token, key);
    req.session.user = data;
  } catch {}
  next();
});*/
router.use((req, res, next) => {
  next();
});
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
  const { nombreUsuario, password } = req.body;
  try {
    const person = await PersonRepository.login({ nombreUsuario, password });
    person.password = "_";
    const token = jwt.sign(
      {
        _id: person._id,
        nombreUsuario: person.username,
        email: person.email,
        foto: person.fotoDePerfil,
      },
      key,
      {
        expiresIn: "1h",
      }
    );
    res
      .cookie("access_token", token, {
        httpOnly: true, // la cookie solo se puede acceder en el servidor
        //secure: process.env.NODE_ENV === "production", // la cookie solo se puede acceder en https
        sameSite: "strict", // la cookie solo se puede acceder del mismo dominio
        maxAge: 1000 * 60 * 60, // la cookie tiene un tiempo de validez de 1 hora
      })
      .status(200)
      .json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/logout", async (req, res) => {
  res
    .clearCookie("access_token")
    .json({ message: "Sesión cerrada correctamente" });
});

router.get("/protected", async (req, res) => {
  const { user } = req.session;
  if (!user) return res.status(403).send("Acceso no autorizado");
  res.status(200).json(user);
});
export default router;
