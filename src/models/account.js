import mongoose from "mongoose";
const { Schema } = mongoose;

const accountSchema = new Schema({
  resourceType: { type: String, required: true },
  status: { type: String, required: true },
  billingStatus: {
    text: { type: String },
  },
  subject: { type: Number, required: true },
  encounters: [
    {
      reference: { type: String },
      display: { type: String },
    },
  ],
  procedure: [
    {
      sequence: { type: Number, required: true },
      code: {
        coding: [
          {
            system: { type: String, required: true },
            code: { type: String, required: true },
            display: { type: String, required: true },
          },
        ],
      },
      dateOfService: { type: String },
    },
  ],
  balance: {
    amount: {
      value: { type: Number, required: true },
      currency: { type: String, required: true },
    },
  },
  calculatedAt: { type: String },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
