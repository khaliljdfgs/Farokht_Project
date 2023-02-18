import mongoose from "mongoose";
import User from "../User.js";

const Schema = mongoose.Schema;
const UOMSchema = new Schema(
  {
  name: {
    type: String,
    required: [true, 'Name is required!'],
    minLength: [1, 'Name is too short!'],
    maxLength: [25, 'Name is too long!'],
    trim: true,
    unique:true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: User
  }
}, { timestamps: true })

export default mongoose.model("UnitOfMeasure", UOMSchema);