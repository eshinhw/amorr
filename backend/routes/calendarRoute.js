import {
  createTimeslot, 
  getCalenders, 
  getCalendarById, 
  getTimeslot,
  deleteTimeslot,
  getTimeslotId,
  updateTimeWithCustomerId
} from "../controllers/calendarController.js";
import express from "express";

const router = express.Router();

router.post("/", createTimeslot);

// get all calendars
router.get("/", getCalenders);

// get one provider's calendar
router.get("/calendar/:id", getCalendarById);

// get the detail of one timeslot
router.get("/timeslot/:id", getTimeslot);

// deletes a timeslot
router.delete("/timeslot/", deleteTimeslot);

// gets timeslot from time and provider id
router.get("/timeslot/:id/:start", getTimeslotId);

router.patch("/timeslot/:id", updateTimeWithCustomerId);

export default router;
