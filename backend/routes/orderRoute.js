import {
  saveOrder, 
  getOrderByProviderId, 
  getOrderByCalendarId,
  getOrderByCustomerId, 
  updateOrderRatedById, 
  updateOrderCompleteById
} from "../controllers/orderController.js";
import express from "express";

const router = express.Router();

router.post("/save-order", saveOrder);
router.get("/calendar/:id", getOrderByCalendarId);
router.get("/customer/:id", getOrderByCustomerId);
router.get("/provider/:id", getOrderByProviderId);
router.patch("/completed/:id", updateOrderCompleteById);
router.patch("/rated/:id", updateOrderRatedById);

export default router;
