import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

//POST /api/orders/save-order
const saveOrder = async (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let address = req.body.address;
  let payment = req.body.payment;
  let calendar_id = req.body.calendar_id;
  let service_id = req.body.service_id;
  
  let customer_id = req.body.customerId;
  let provider_id = req.body.providerId;

  if (!firstName || !lastName || !address || !payment || !calendar_id || !service_id || !customer_id || !provider_id) {
    res.status(400).json({error: "please add all fields name, email, and password"});
  }

  const newOrder = await Order.create({
    firstName,
    lastName,
    address,
    payment, 
    calendar_id, 
    service_id,
    customer_id,
    provider_id
  });

  if (newOrder) {
    res.status(201).json({
      _id: newOrder.id,
      firstName: newOrder.firstName,
      lastName: newOrder.lastName,
      address: newOrder.address,
      payment: newOrder.payment,
      calendar_id: newOrder.calendar_id, 
      service_id: newOrder.service_id,
      customer_id: newOrder.customer_id,
      provider_id: newOrder.provider_id,
    });
  } else {
    res.status(400).json({error: "problem with creating order"});
  }
};


//@desc    Get the order detail from calendar_id
//@route   GET /api/orders/calendar/:id
//@access  Public
const getOrderByCalendarId = asyncHandler(async (req, res) => {
  const order = await Order.find({ calendar_id: req.params.id }).select("-address -payment");
  // check if Provider exist
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
    throw new Error('Order not found');
  }
});

//@desc    Get the orders from provider id
//@route   GET /api/orders/provider/:id
//@access  Public
const getOrderByProviderId = asyncHandler(async (req, res) => {
  const order = await Order.find({ provider_id: req.params.id }).select("-payment");
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
    throw new Error('Order not found');
  }
});


//@desc    Get the orders from customer id
//@route   GET /api/orders/customer/:id
//@access  Public
const getOrderByCustomerId = asyncHandler(async (req, res) => {
  const order = await Order.find({ customer_id: req.params.id }).select("-payment");
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
    throw new Error('Order not found');
  }
});

//@desc    update the orders to be completed from given order id
//@route   PATCH /api/orders/completed/:id
//@access  Public
const updateOrderCompleteById = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id,{completed: true} ).select("-payment");
  // check if Provider exist
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
    throw new Error('Order not found');
  }
});

//@desc    update the orders to be rated from given order id
//@route   PATCH /api/orders/rated/:id
//@access  Public
const updateOrderRatedById = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id,{rated: true} ).select("-payment");
  // check if Provider exist
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
    throw new Error('Order not found');
  }
});

export { saveOrder, getOrderByCalendarId, getOrderByProviderId, getOrderByCustomerId, updateOrderRatedById, updateOrderCompleteById };