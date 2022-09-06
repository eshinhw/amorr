import {
  createReview,
  getReviews,
  getSingleReview,
  deleteReview,
  updateReview,
} from "../controllers/reviewController.js";
import express from "express";

const router = express.Router();

// get all reviews
router.get("/", getReviews);

// get single review
router.get("/:reviewId", getSingleReview);

router.post("/", createReview);

//
router.delete("/:reviewId", deleteReview);

router.patch("/:reviewId", updateReview);

export default router;
