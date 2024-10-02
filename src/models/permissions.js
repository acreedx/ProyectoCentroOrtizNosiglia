import mongoose from "mongoose";
const { Schema } = mongoose;
/*
  ObjectId('66fa272521218bdf69e62501'),   
  new ObjectId('66fa272521218bdf69e62502'),
  new ObjectId('66fa272521218bdf69e62504'),
  new ObjectId('66fa272521218bdf69e62505'),
  new ObjectId('66fa272521218bdf69e62509'),
  new ObjectId('66fa272521218bdf69e624ff'),
  new ObjectId('66fa272521218bdf69e62506'),
  new ObjectId('66fa272521218bdf69e6250a'),
  new ObjectId('66fa272521218bdf69e6250b'),
  new ObjectId('66fa272521218bdf69e6250c'),
  new ObjectId('66fa272521218bdf69e62508'),
  new ObjectId('66fa272521218bdf69e62507'),
  new ObjectId('66fa272521218bdf69e62503'),
  new ObjectId('66fa272521218bdf69e62500')
*/
const permissionSchema = new Schema(
  {
    permissionName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    active: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);
const Permission = mongoose.model("Permission", permissionSchema);

export default Permission;
