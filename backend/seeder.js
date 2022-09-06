import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import providers from "./data/providers.js";
import service from "./data/service.js";
import Provider from "./models/providerModel.js";
import Service from "./models/serviceModel.js";
import connectDB from "./config/db.js";



dotenv.config();
connectDB();

// import sample data to database
const importData = async () => {
  try {
    // clear all data first
    await Provider.deleteMany();
    await Service.deleteMany();
    // insert data
    const createdProvider = await Provider.insertMany(providers);
    const adminProvider = createdProvider[0]._id;
    const sampleService = service.map((service) => {
      return { ...service, provider: adminProvider };
    });
    await Service.insertMany(sampleService);
    console.log("Data successfully loaded!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

// destroy all data from database
const destroyData = async () => {
  try {
    // clear all data
    await Provider.deleteMany();
    await Service.deleteMany();

    console.log("Data successfully destroyed!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

// Determine which functions are executed on the command line
process.argv.slice(2).forEach(arg => {
  switch (arg) {
    case "--import":
      importData();
      break;
    case "-i":
      importData();
      break;
    case "--destroy":
      destroyData();
      break;
    case "-d":
      destroyData();
      break;
    default:
      console.log("Unknown command");
      process.exit(1);
  }
});