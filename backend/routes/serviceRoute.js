import {
  addService, 
  getAllServices,
  getServicesByProviderId, 
  getServiceById, 
  deleteServiceById
} from "../controllers/serviceController.js";
import express from "express";

const router = express.Router();

// get all services
router.get("/", getAllServices);

// get single service
router.get("/provider/:id", getServicesByProviderId);

router.get("/:id", getServiceById);

router.post("/", addService);

router.delete("/:id", deleteServiceById);

export default router;
