import bcrypt from "bcrypt";
import Persons from "../models/Persons.js";
import personValidation from "../zod_schemas/personValidation.js";
import { UserRepository } from "./userRepository.js";
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

    const newPerson = new Persons({
      ...personData,
      systemUser: {
        ...systemUser,
        password: await UserRepository.hashPassword(systemUser.password),
      },
      active: active || true,
    });
    const savedPerson = await newPerson.save({ new: true });
    return savedPerson;
  }

  static async login({ nombreUsuario, password }) {
    const person = await Persons.findOne({
      "systemUser.username": nombreUsuario,
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

    return person;
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
