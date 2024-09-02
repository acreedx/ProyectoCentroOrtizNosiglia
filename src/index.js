import app from "./app.js";
import "../db.js";
import Person from "../models/person.js";
import routerPerson from "../routers/person.js";
import routerOdontograma from "../routers/odontograma.js";
const port = 4000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.use("/person", routerPerson);
app.use("/odontograma", routerOdontograma);
app.get("/", (req, res) => {
  res.json("Welcome");
});
