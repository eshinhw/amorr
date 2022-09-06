import asyncHandler from "express-async-handler";
import express from "express";
import Calendar from "../models/calendarModel.js";


// bug: should check start and end time overlap, also have add a day/weekday field in schema
// @desc post new calendar
// @route POST /api/calendars
// @access Public
const createTimeslot = asyncHandler(async (req, res) => {
  let providerId = req.body.providerId;
  let customerId = req.body.customerId;
  let title = req.body.title;
  let startTime = req.body.startTime;
  let endTime = req.body.endTime;
  let rest = req.body.rest;
  try{
    startTime = new Date(startTime);
    endTime = new Date(endTime);  
  } catch (err){
    res.status(400).json({ msg: 'your date value is not valid!'});
    throw new Error('your date value is not valid!');
  }

  // only goes in if statement when any contain null
  if (!(providerId && startTime && endTime)) {
    res.status(400).json({ msg: 'please have all fields filled'});
    throw new Error('please have all fields filled');
  }

  let timeslot = await Calendar.findOne({providerId: providerId, startTime: startTime, endTime: endTime});
  if (timeslot) {
    res.status(400).json({ msg: 'this time slot already exists' });
    return;
  }

  timeslot = await Calendar.find({providerId: providerId, startTime: {$lte: endTime}, endTime: {$gte: startTime}});
  if (JSON.stringify(timeslot) !== "[]") {
    res.status(400).json({ msg: 'this schedule is overlapping with other timeslot!' });
    return;
  }

  const calendar = await Calendar.create({
    providerId, customerId, title, startTime, endTime, rest
  });

  if (calendar) {
    res.status(201).json({
      providerId: calendar.providerId,
      customerId: calendar.customerId,
      title: calendar.title,
      startTime: calendar.startTime,
      endTime: calendar.endTime,
      rest: calendar.rest,
    });
  } else {
    res.status(400).json({ msg: 'problem with creating calendar' });
    throw new Error('problem with creating calendar');
  }
});

//@desc    Get all calenders
//@route   GET /api/calenders
//@access  Public
const getCalenders = asyncHandler(async (req, res) => {
  const calendars = await Calendar.find({})
  res.status(200).json(calendars);
});

//@desc    Get a calender with provider id
//@route   GET /api/calenders/calendar/:id
//@access  Public
const getCalendarById = asyncHandler(async (req, res) => {
  const calendar = await Calendar.find({providerId: req.params.id});
  // check if calendar exist
  if (calendar) {
    res.status(200).json(calendar);
  } else {
    res.status(404).json({ msg: 'Calendar not found' });
    throw new Error('Calendar not found');
  }
});

//@desc    Get detail of a time slot of calender with provider id
//@route   GET /api/calendars/timeslot/:id
//@access  Public
// (have not test and go into detail of this yet)
const getTimeslot = asyncHandler(async (req, res) => {
  const timeslot = await Calendar.findById(req.params.id);
  // check if calendar exist
  if (timeslot) {
    res.json(timeslot);
  } else {
    res.status(404).json({ msg: 'timeslot not found' });
    throw new Error('timeslot not found');
  }
});

//@desc    deletes the timeslot in a calendar when given the Id of the
//@route   DELETE /api/calendars/timeslot
//@access  Public

const deleteTimeslot = asyncHandler(async (req,res) => {
  const timeslot = await Calendar.findByIdAndDelete(req.body._id)
  if (timeslot) {
    res.status(200).json({timeslot})
  } else {
    res.status(404).json({ msg: 'timeslot not found' });
    throw new Error('timeslot not found');
  }

});

//@desc    gets a timeslot ID using the start and end time of an event and the providersId
//@route   GET /api/calendars/timeslot/:id/:start
//@access  Public

const getTimeslotId = asyncHandler(async (req, res) => {
  const timeslot = await Calendar.findOne({providerId: req.params.id,
    startTime: req.params.start});
  // check if calendar exist
  if (timeslot) {
    res.json(timeslot);
  } else {
    res.status(404).json({ msg: 'timeslot not found' });
    throw new Error('timeslot not found');
  }
});


//@desc    updates timeslot with new customerid
//@route   PATCH /api/calendars/timeslot/:id
//@access  Public

const updateTimeWithCustomerId = asyncHandler(async (req, res) => {
  const timeslot = await Calendar.findByIdAndUpdate(req.params.id, {customerId: req.body.customerId})
  if (timeslot) {
    res.status(200).json({timeslot})
  } else {
    res.status(404).json({ msg: 'timeslot not found' });
    throw new Error('timeslot not found');
  }
});




export { createTimeslot, getCalenders, getCalendarById, getTimeslot, deleteTimeslot, getTimeslotId,
  updateTimeWithCustomerId };