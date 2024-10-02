import bcrypt from "bcrypt";
import Persons from "../models/Persons.js";
import personValidation from "../zod_schemas/personValidation.js";
import { UserRepository } from "./userRepository.js";
import Rol from "../models/roles.js";
export class PersonsRepository {
  static async create(personData) {
    const parsedData = personValidation.safeParse(personData);
    if (!parsedData.success) {
      const validationErrors = parsedData.error.errors.map(
        (err) => err.message
      );
      throw new Error(validationErrors.join(", "));
    }
    const { systemUser, active } = parsedData.data;
    const existingPerson = await Persons.findOne({
      "systemUser.username": systemUser.username,
    });
    if (existingPerson) {
      throw new Error("El nombre de usuario ya existe");
    }
    const findPersonByCi = await Persons.findOne({
      carnetDeIdentidad: personData.carnetDeIdentidad,
    });
    if (findPersonByCi) {
      throw new Error("Ya existe un usuario con ese Carnet");
    }
    const IdRolPaciente = await Rol.findOne({ roleName: "Paciente" });
    const today = new Date();
    const newPerson = new Persons({
      ...personData,
      systemUser: {
        username: systemUser.username,
        password: await UserRepository.hashPassword(systemUser.password),
        roles: [IdRolPaciente._id],
        lastLogin: "",
        passwordExpiration: new Date(
          today.setMonth(today.getMonth() + 3)
        ).toLocaleDateString("es-ES"),
        status: true,
      },
      active: true,
    });
    const savedPerson = await newPerson.save({ new: true });
    return savedPerson;
  }

  static async login({ nombreUsuario, password }) {
    const person = await Persons.findOne({
      "systemUser.username": nombreUsuario,
    }).populate({
      path: "systemUser.roles",
      populate: {
        path: "permissions", // Esto asegura que se pueblen los permisos dentro de los roles
      },
    });
    if (!person) {
      throw new Error("El usuario no existe");
    }
    const isValidPassword = await bcrypt.compare(
      password,
      person.systemUser.password
    );
    if (!isValidPassword) {
      throw new Error("El password es incorrecto");
    }
    person.systemUser.password = "_";
    const permissions = person.systemUser.roles.reduce((acc, role) => {
      return acc.concat(role.permissions);
    }, []);
    const uniquePermissions = [
      ...new Set(permissions.map((p) => p.code.toString())),
    ];
    const uniquePermissionObjects = permissions.filter(
      (p, index, self) =>
        index ===
        self.findIndex((perm) => perm._id.toString() === p._id.toString())
    );
    console.log(uniquePermissionObjects);
    return { person, uniquepermissions: uniquePermissions };
  }
  static async updatePerson(id, personData) {
    const updatedPerson = await Persons.findByIdAndUpdate(id, personData, {
      new: true,
    });
    if (!updatedPerson) {
      throw new Error("No se encontró a la persona para actualizar");
    }
    return updatedPerson;
  }
}
