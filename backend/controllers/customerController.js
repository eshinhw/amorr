import mongoose from "mongoose";
import Customer from "../models/customerModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
};

// @desc register new customer
// @route POST /api/customers
// @access Public
const registerCustomer = asyncHandler(async (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("please add all fields name, email, and password");
  }

  const customerExist = await Customer.findOne({ email });

  if (customerExist) {
    res.status(400);
    throw new Error("customer already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const saltedhash = await bcrypt.hash(password, salt);

  const customer = await Customer.create({
    firstName,
    lastName,
    email,
    password: saltedhash,
  });

  if (customer) {
    res.status(201).json({
      _id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      token: generateToken(customer._id),
    });
  } else {
    res.status(400);
    throw new Error("problem with creating customer (invalid customer data)");
  }
});

// @desc login or authenticate customer
// @route POST /api/customers/login
// @access Public
const loginCustomer = asyncHandler(async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    res.status(400);
    throw new Error("please have all fields filled: name, email, and password");
  }

  const customer = await Customer.findOne({ email });

  if (customer && (await bcrypt.compare(password, customer.password))) {
    const token = generateToken(customer._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: 3*24*60*60*1000})
    res.json({
      _id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("login failed, invalid email or password");
  }
});

// @desc logout customer
// @route POST /api/customers/logout
// @access Public
const logoutCustomer = asyncHandler(async (req, res) => {
  try{
    // Set token to none and expire after 1 seconds
    res.cookie('jwt', 'none', {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200)
      .json({ msg: 'User logged out successfully' });
  } catch (err){
    
    res.status(500);
    throw new Error("logout failed, some problem occurs");
  }
});


// @desc get customer data
// @route GET /api/customers/:customerId
// @access Private

// example of protect route, prob should be public
const getCustomer = asyncHandler(async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId).select('-password');

    res.status(200).json(customer);
  } catch (error) {
    res.status(400);
    throw new Error(
      "get failed, customer not exists (could be deleted but still using the corresponding token)"
    );
  }
});

// get all customers

const getCustomers = async (req, res) => {
  // descending order createdAt:-1
  const customers = await Customer.find({}).sort({ createdAt: -1 });
  res.status(200).json(customers);
};

const getSingleCustomer = async (req, res) => {
  const { id } = req.params.customerId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such customer exists" });
  }
  const customer = await Customer.findById(id);

  if (!customer) return res.status(404).json({ error: "No such customer exists" });
  res.status(200).json(customer);
};

// get the default address of a customer
const getDefaultAddress = async (req, res) => {
  const token = req.cookies.jwt;
  if (token){
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err){
        console.log(err.message);
      }
      else{
        let customer = await Customer.findById(decodedToken.id);
        res.json({
          address: customer.defaultAddress
        })
      }
    })
  }
  else{
    res.json({
      address: "Please log in to see your address"
    })
  }

};

// delete a customer

const deleteCustomer = async (req, res) => {
  const { id } = req.params.customerId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such customer exists" });
  }

  const customer = await Customer.findOneAndDelete({ _id: id });

  if (!customer) return res.status(400).json({ error: "No such customer exists" });

  res.status(200).json(customer);
};

const updateCustomer = async (req, res) => {
  const { id } = req.params.customerId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such customer exists" });
  }

  const customer = await Customer.findOneAndUpdate({ _id: id }, {});

  if (!customer) return res.status(400).json({ error: "No such customer exists" });

  res.status(200).json(customer);
};

// changes the default address of a customer to addr
const updateDefaultAddress = async (req, res) => {
  const token = req.cookies.jwt;
  if (token){
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err){
        console.log(err.message);
      }
      else{
        let customer = await Customer.findOneAndUpdate({_id: decodedToken.id}, {defaultAddress: req.body.address});
        res.json({
          address: customer.defaultAddress,
          logged_in: true
        })
      }
    })
  }
  else{
    // console.log("Have not logged in")
  }
};

export {
  registerCustomer,
  loginCustomer,
  logoutCustomer,
  getCustomer,
  getCustomers,
  deleteCustomer,
  updateCustomer,

  getDefaultAddress,
  updateDefaultAddress,
};
