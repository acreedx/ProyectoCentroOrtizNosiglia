const PersonsSchema = new Schema(
  {
    primerNombre,
    segundoNombre,
    apellido,
    genero,
    fechaNacimiento,
    telefono,
    celular,
    email,
    foto,
    direccion,
    ciudad,
    estado,
    codigopostal,
    estadoCivil,
    Ci,
    nombreUsuario,
    password,

    name: {
      given: [{ type: String, required: true }],
      family: { type: String, required: true },
    },
    gender: { type: String, required: true },
    birthDate: { type: String, required: true },
    telecom: [
      {
        value: { type: String, required: true },
      },
      {
        value: { type: String, required: true },
      },
      {
        value: { type: String, required: true },
      },
    ],
    photo: {
      _url: {
        id: { type: String, required: true },
      },
    },
    address: {
      line: [{ type: String, required: true }],
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
