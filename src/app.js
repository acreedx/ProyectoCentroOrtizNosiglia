import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // El dominio de tu aplicación front-end
  credentials: true, // Permitir envío de cookies
};
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
export default app;
