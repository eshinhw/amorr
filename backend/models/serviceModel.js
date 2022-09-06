import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Provider",
  },
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true
  },
  price: {
    type: String,
    require: true
  },
  duration: {
    type: String,
    require: true
  }
}, {
  timestamps: true,
});

serviceSchema.index({ provider: 1, name: 1 }, { unique: true });
const Service = mongoose.model("Service", serviceSchema);
export default Service;