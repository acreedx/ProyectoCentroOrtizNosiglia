import mongoose from "mongoose";
const { Schema } = mongoose;
const PersonsSchema = new Schema(
  {
    resourceType: { type: String, default: "Patient" },
    active: { type: Boolean, required: true },
    name: {
      use: { type: String, default: "official" },
      given: [{ type: String, required: true }],
      family: { type: String, required: true },
    },
    gender: { type: String, required: true },
    birthDate: { type: String, required: true },
    telecom: [
      {
        value: { type: String, required: true },
        use: { type: String, default: "home" },
        system: { type: String, default: "phone" },
      },
      {
        value: { type: String, required: true },
        use: { type: String, default: "home" },
        system: { type: String, default: "cellphone" },
      },
      {
        value: { type: String, required: true },
        use: { type: String, default: "home" },
        system: { type: String, default: "email" },
      },
    ],
    photo: {
      _url: {
        id: { type: String, required: true },
      },
    },
    address: {
      use: { type: String, default: "home" },
      line: [{ type: String }],
      city: { type: String, required: true },
      state: { type: String },
      postalCode: { type: String },
    },
    maritalStatus: {
      coding: [
        {
          system: { type: String },
          code: { type: String },
          display: { type: String },
        },
      ],
    },
    carnetDeIdentidad: { type: String, required: true, unique: true },
    systemUser: {
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      roles: [{ type: Schema.Types.ObjectId, ref: "Rol", required: true }],
      lastLogin: { type: String },
      passwordExpiration: { type: String },
      status: { type: String },
    },
    allergies: [
      {
        substance: { type: String, required: true },
        reaction: { type: String, required: true },
        severity: {
          type: String,
          enum: ["mild", "moderate", "severe"],
          required: true,
        },
        notes: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Persons = mongoose.model("Persons", PersonsSchema);

export default Persons;
