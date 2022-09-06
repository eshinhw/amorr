import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: [true, "please add a first name"],
    },

    lastName: {
      type: String,
      require: [true, "please add a last name"],
    },
    address: {
      addressOne: {
        type: String,
        require: [true, "please add a first name"],
      },

      addressTwo: {
        type: String,
        require: [true, "please add a last name"],
      },

      city: {
        type: String,
        require: [true, "please add a email"],
      },

      province: {
        type: String,
        require: [true, "please add a password"],
      },

      postalCode: {
        type: String,
        require: [true, "please add a password"],
      },

      country: {
        type: String,
        require: [true, "please add a password"],
      },
    },

    payment: {
      nameOnCard: {
        type: String,
        require: [true, "please add a email"],
      },

      cardNumber: {
        type: String,
        require: [true, "please add a password"],
      },

      expiryMonth: {
        type: String,
        require: [true, "please add a password"],
      },

      expiryYear: {
        type: String,
        require: [true, "please add a password"],
      },
      cvv: {
        type: String,
        require: [true, "please add a password"],
      },
    },
    calendar_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Calendar",
      unique: true,
    },
    service_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Service",
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Customer",
    },
    provider_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Provider",
    },
    completed: {
      type: Boolean, 
      default: false
    },
    rated: {
      type: Boolean, 
      default: false
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
