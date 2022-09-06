import mongoose from "mongoose";

const providerSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'please add a name']
  },
  title: {
    type: String,
    require: [true, 'please add a title']
  },
  address: {
    type: String,
    require: [true, 'please add an address']
  },
  range: {
    type: String,
    require: [true, 'please add a range']
  },
  city: {
    type: String,
    require: [true, 'please add a city']
  },
  state: {
    type: String,
    require: [true, 'please add a state']
  },
  country: {
    type: String,
    require: [true, 'please add a country']
  },
  email: {
    type: String,
    require: [true, 'please add a email'],
    unique: true
  },
  phone: {
    type: String,
    require: [true, 'please add a phone'],
  },
  password: {
    type: String,
    require: [true, 'please add a password']
  },
  imageFilename: {
    type: String,
    require: [true, 'please upload a image, this is String field, generated filename of it']
  },
  individual: {
    type: String,
    default: "yes"
  },
  totalRating: {
    type: Number,
    require: true,
  },
  ratingPopulation: {
    type: Number,
    require: true,
  },
  // reviews: [reviewSchema],
  isAdmin: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});
const provider = mongoose.model("Provider", providerSchema);
export default provider;