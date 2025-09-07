import mongoose from "mongoose";

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
    },
    work: {
      type: String,
      enum: ["chef", "waiter", "manager"],
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    salary: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Person = mongoose.model("Person", personSchema);
