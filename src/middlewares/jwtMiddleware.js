/*import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const key = process.env.SECRET_JWT_KEY.toString();
const getUser = (req, res, next) => {
  const token = req.cookies?.access_token;
  req.session = { user: null };
  try {
    const data = jwt.verify(token, key);
    req.session.user = data;
  } catch {}
  next();
};
export default getUser;*/
