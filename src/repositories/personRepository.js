import Person from "../models/person.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";

export class PersonRepository {
  static async create({
    fotoDePerfil,
    apellidoPaterno,
    apellidoMaterno,
    primerNombre,
    segundoNombre,
    nombreUsuario,
    password,
    fechaNacimiento,
    lugarNacimiento,
    sexo,
    carnetIdentidad,
    direccionZona,
    telefono,
    celular,
    email,
    alergiaMedicamento,
    estado,
  }) {
    if (typeof nombreUsuario != "string")
      throw new Error("El nombre de usuario debe ser una cadena");
    if (nombreUsuario.length < 3)
      throw new Error("El nombre de usuario debe ser de mínimo 3 caracteres");

    if (typeof password != "string")
      throw new Error("El password debe ser una cadena");
    if (password.length < 6)
      throw new Error("El password debe ser de mínimo 6 caracteres");

    const person = await Person.findOne({ nombreUsuario: nombreUsuario });
    if (person) throw new Error("El nombre de la persona ya existe");
    const rondasDeSalting = 10;
    const hashedPassword = await bcrypt.hash(password, rondasDeSalting);
    const newPerson = new Person({
      fotoDePerfil,
      apellidoPaterno,
      apellidoMaterno,
      primerNombre,
      segundoNombre,
      nombreUsuario,
      password: hashedPassword,
      fechaNacimiento,
      lugarNacimiento,
      sexo,
      carnetIdentidad,
      direccionZona,
      telefono,
      celular,
      email,
      alergiaMedicamento,
      estado,
    });
    const savedPerson = await newPerson.save();
    return savedPerson;
  }

  static async login({ nombreUsuario, password }) {
    const person = await Person.findOne({ nombreUsuario: nombreUsuario });
    if (!person) throw new Error("La persona no existe");

    const isValid = await bcrypt.compare(password, person.password);
    if (!isValid) throw new Error("El password es inválido");
    return person;
  }
}
