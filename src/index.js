import app from "./app.js";
import "../db.js";
import routerPerson from "./routers/person.js";
import routerOdontograma from "./routers/odontograma.js";
import routerUser from "./routers/user.js";
import routerAppointmet from "./routers/appointment.js";
const port = 4000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.use("/person", routerPerson);
app.use("/odontograma", routerOdontograma);
app.use("/user", routerUser);
app.use("/appointment", routerAppointmet);
app.get("/", (req, res) => {
  res.json("Welcome");
});
