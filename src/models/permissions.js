import mongoose from "mongoose";
const { Schema } = mongoose;
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
  },
  {
    timestamps: true,
  }
);
const Permission = mongoose.model("Permission", permissionSchema);

export default Permission;
