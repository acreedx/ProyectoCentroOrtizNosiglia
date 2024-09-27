import mongoose from "mongoose";
const { Schema } = mongoose;
const personSchema = new Schema(
  {
    fotoDePerfil: { type: String, required: true },
    apellidoPaterno: { type: String, required: true },
    apellidoMaterno: { type: String, required: true },
    primerNombre: { type: String, required: true },
    segundoNombre: { type: String, required: true },
    nombreUsuario: { type: String, required: true },
    password: { type: String, required: true },
    fechaNacimiento: { type: String, required: true },
    lugarNacimiento: { type: String, required: true },
    sexo: { type: String, required: true },
    carnetIdentidad: { type: String, required: true },
    direccionZona: { type: String, required: true },
    telefono: { type: String, required: true },
    celular: { type: String, required: true },
    email: { type: String, required: true },
    alergiaMedicamento: { type: String, required: true },
    estado: { type: Boolean, default: true },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rol",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);
/*
const personSchema = new Schema({
  resourceType: { type: String, required: true },
  name: [
    {
      use: { type: String, required: true },
      given: [{ type: String, required: true }],
      family: { type: String, required: true },
    },
  ],
  gender: { type: String, required: true },
  birthDate: { type: String, required: true },
  telecom: [
    {
      value: { type: String, required: true },
      use: { type: String, required: true },
      system: { type: String, required: true },
    },
  ],
  photo: [
    {
      _url: { id: { type: String, required: true } },
    },
  ],
  address: [
    {
      use: { type: String, required: true },
      line: [{ type: String, required: true }],
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
  ],
  contact: {
    relationship: { type: String, required: true },
    name: [
      {
        use: { type: String, required: true },
        given: [{ type: String, required: true }],
        family: { type: String, required: true },
      },
    ],
    telecom: {
      value: { type: String, required: true },
      use: { type: String, required: true },
      system: { type: String, required: true },
    },
    address: [
      {
        use: { type: String, required: true },
        line: [{ type: String, required: true }],
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
      },
    ],
    gender: { type: String, required: true },
  },
});
*/
const Person = mongoose.model("Person", personSchema);

export default Person;
