import mongoose from "mongoose";

const userSechma = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  passwordHash: String,
  registeredwith: String,
  registrationDate: Date,
  identify: Boolean,
  identifyToken: String,
  identifyDate: Date,
});

export const userData = mongoose.model("userData", userSechma);
