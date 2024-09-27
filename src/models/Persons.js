import mongoose from "mongoose";
const { Schema } = mongoose;
const PersonsSchema = new Schema({
  resourceType: { type: String, required: true },
  active: { type: Boolean, required: true },
  name: {
    use: { type: String, required: true },
    given: [{ type: String, required: true }],
    family: { type: String, required: true },
  },
  gender: { type: String, required: true },
  birthDate: { type: String, required: true },
  telecom: [
    {
      value: { type: String, required: true },
      use: { type: String },
      system: { type: String },
    },
  ],
  photo: {
    _url: {
      id: { type: String, required: true },
    },
  },
  address: {
    use: { type: String },
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
  systemUser: {
    username: { type: String, required: true },
    password: { type: String, required: true },
    roles: [{ type: String }],
    lastLogin: { type: String },
    passwordExpiration: { type: String },
    status: { type: String },
  },
});

const Person = mongoose.model("Person", PersonsSchema);

module.exports = Person;
