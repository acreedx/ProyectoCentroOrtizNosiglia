import User from "../models/user.js";
import bcrypt from "bcrypt";
import crypto from "node:crypto";

export class UserRepository {
  static async create({ username, password, email }) {
    if (typeof username != "string")
      throw new Error("El nombre de usuario debe ser una cadena");
    if (username.length < 3)
      throw new Error("El nombre de usuario debe ser de mínimo 3 caracteres");

    if (typeof password != "string")
      throw new Error("El password debe ser una cadena");
    if (password.length < 6)
      throw new Error("El password debe ser de mínimo 6 caracteres");

    const user = await User.findOne({ username: username });
    if (user) throw new Error("El nombre de usuario ya existe");
    const rondasDeSalting = 10;
    const hashedPassword = await bcrypt.hash(password, rondasDeSalting);
    const newUser = new User({ username, password: hashedPassword, email });
    const savedUser = await newUser.save();
    return savedUser;
  }

  static async login({ username, password }) {
    const user = await User.findOne({ username: username });
    if (!user) throw new Error("El usuario no existe");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("El password es inválido");
    return user;
  }
}
