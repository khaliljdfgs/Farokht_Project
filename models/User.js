import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    phoneNumber1: {
      type: String,
      maxlength: 20,
      trim: true,
      unique: true,
      sparse: true,
    },
    phoneNumber2: {
      type: String,
      maxlength: 20,
      trim: true,
      unique: true,
      sparse: true,
    },
    landLine: {
      type: String,
      maxlength: 20,
      trim: true,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: 'PLease provide a valid email'
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "vendor", "retailer"],
      default: "retailer",
    },
    companyName: {
      type: String,
      maxlength: 20,
      trim: true,
    },
    location: {
      type: String,
      default: "My city",
      maxlength: 20,
      trim: true,
    },
    address: {
      type: String,
      maxlength: 30,
      trim: true,
    },
    paymentMethod: {
      type: String,
      maxlength: 20,
      trim: true,
    },
    bankName: {
      type: String,
      maxlength: 20,
      trim: true,
    },
    bankBranchNumber: {
      type: String,
      maxlength: 10,
      trim: true,
    },
    bankAccountNumber: {
      type: String,
      maxlength: 20,
      trim: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "suspended"],
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  // console.log(this.password)

  if (!this.isModified('password')) {
    return
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)  
})

UserSchema.methods.createJWT = function () {
  // console.log(this)
  return jwt.sign( { userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME } )
}
UserSchema.methods.comparePassword = async function (candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

export default mongoose.model("User", UserSchema);
