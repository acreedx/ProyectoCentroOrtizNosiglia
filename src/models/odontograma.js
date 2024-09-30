import mongoose from "mongoose";
const { Schema } = mongoose;
const odontogramaSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Person",
      required: true,
    },
    odontogramRows: [
      {
        msc: { type: String, required: true },
        temp: { type: String, required: false },
        piezas: { type: String, required: true },
        fecha: { type: String, required: false },
        diagnostico: { type: String, required: false },
        tratamiento: { type: String, required: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Odontograma = mongoose.model("Odontograma", odontogramaSchema);

export default Odontograma;
