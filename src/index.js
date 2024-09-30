import app from "./app.js";
import "../db.js";
import routerAccount from "./routers/account.js";
import routerAppointment from "./routers/appointment.js";
import routerAppointments from "./routers/appointments.js";
import routerAuditEvent from "./routers/auditEvent.js";
import routerCarePlan from "./routers/carePlan.js";
import routerComposition from "./routers/composition.js";
import routerEncounter from "./routers/encounter.js";
import routerImagingStudy from "./routers/imagingStudy.js";
import routerOdontograma from "./routers/odontograma.js";
import routerPatient from "./routers/patient.js";
import routerPermission from "./routers/permissions.js";

import routerPerson from "./routers/person.js";
import routerPersons from "./routers/persons.js";
import routerPractitioner from "./routers/practitioner.js";
import routerRole from "./routers/roles.js";

import routerUser from "./routers/user.js";
const port = 4000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.use("/account", routerAccount);
app.use("/appointment", routerAppointment);
app.use("/appointments", routerAppointments);
app.use("/auditEvent", routerAuditEvent);
app.use("/carePlan", routerCarePlan);
app.use("/composition", routerComposition);
app.use("/encounter", routerEncounter);
app.use("/imagingStudy", routerImagingStudy);
app.use("/odontograma", routerOdontograma);
app.use("/patient", routerPatient);
app.use("/permission", routerPermission);
app.use("/person", routerPerson);
app.use("/persons", routerPersons);
app.use("/practitioner", routerPractitioner);
app.use("/rol", routerRole);
app.use("/user", routerUser);
app.get("/", (req, res) => {
  res.json("Welcome");
});
