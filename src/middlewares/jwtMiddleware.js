import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const key = process.env.SECRET_JWT_KEY.toString();

const getUser = (req, res, next) => {
  const token = req.cookies?.access_token;
  req.session = { user: null };
  try {
    const data = jwt.verify(token, key);
    req.session.user = data; // Asigna los datos del usuario a la sesión
  } catch (error) {
    console.error("Error al verificar el token:", error);
  }
  next();
};

export default getUser;
