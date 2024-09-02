import mongoose from "mongoose";
const { Schema } = mongoose;

const accountSchema = new Schema({});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
