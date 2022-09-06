import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: [true, "please add a first name"],
    },

    lastName: {
      type: String,
      require: [true, "please add a last name"],
    },

    email: {
      type: String,
      require: [true, "please add a email"],
      unique: true,
    },

    password: {
      type: String,
      require: [true, "please add a password"],
    },
    
    defaultAddress: {
      type: String,
      require: [true, "please add an address"],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Customer", customerSchema);
