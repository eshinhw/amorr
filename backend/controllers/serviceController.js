import Service from "../models/serviceModel.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// @desc create a new service
// @route POST /api/services
// @access Public
const addService = asyncHandler(async (req, res) => {
  let provider = req.body.provider;
  let name = req.body.name;
  let description = req.body.description;
  let price = req.body.price;
  let duration = req.body.duration;

  // validate provider id
  if (!mongoose.Types.ObjectId.isValid(provider)) {
    return res.status(404).json({ message: "your provider id is invalid" });
  }

  if (isNaN(price)) {
    return res.status(400).json({ message: "please filled price of number only" });
  }

  // only goes in if statement when any contain null
  if (!(name && description && price && duration)) {
    res.status(400);
    throw new Error('please have all fields filled');
  }

  const serviceExist = await Service.findOne({ provider: provider, name: name });
  if (serviceExist) {
    res.status(400);
    throw new Error('service with this name already exists');
  }

  const service = await Service.create({
    provider, name, description, price, duration
  });

  if (service) {
    res.status(201).json({
      _id: service.id,
      provider: service.provider,
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
    });
  } else {
    res.status(400);
    throw new Error('problem with adding service');
  }
});


// @desc get all services
// @route GET /api/services
// @access Public
const getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find();
  res.status(200).json(services);
});


//@desc    Get all services from one provider
//@route   GET /api/services/provider/:id
//@access  Public
const getServicesByProviderId = asyncHandler(async (req, res) => {
  const service = await Service.find({ provider: req.params.id });
  // check if Provider exist
  if (service) {
    res.json(service);
  } else {
    res.status(404).json({ message: 'Service not found' });
    throw new Error('Service not found');
  }
});

//@desc    Get all services from one provider
//@route   GET /api/services/:id
//@access  Public
const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  // check if Provider exist
  if (service) {
    res.json(service);
  } else {
    res.status(404).json({ message: 'Service not found' });
    throw new Error('Service not found');
  }
});


//@desc    delete a service
//@route   DELETE /api/services/:id
//@access  Public
const deleteServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findOneAndDelete({ _id: req.params.id });

  if (!service) return res.status(400).json({ message: "No such service exists" });

  res.status(200).json({ message: 'Service successfully deleted.' });
});

export { addService, getAllServices, getServicesByProviderId, getServiceById, deleteServiceById };