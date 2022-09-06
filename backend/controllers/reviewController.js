import Review from "../models/reviewModel.js";
import mongoose from "mongoose";

// get all reviews

const getReviews = async (req, res) => {
  // descending order createdAt:-1
  const reviews = await Review.find({}).sort({ createdAt: -1 });
  res.status(200).json(reviews);
};

const getSingleReview = async (req, res) => {
  const { id } = req.params.reviewId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review exists" });
  }
  const review = await Review.findById(id);

  if (!review) return res.status(404).json({ error: "No such review exists" });
  res.status(200).json(review);
};

// create a new review
const createReview = async (req, res) => {
  const { customerId, providerId, reviewContent, rating } = req.body;

  try {
    const review = await Review.create({ customerId, providerId, reviewContent, rating });
    res.status(200).json(review);
  } catch (err) {
    res.status(400).json(err);
  }
};

// delete a review

const deleteReview = async (req, res) => {
  const { id } = req.params.reviewId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review exists" });
  }

  const review = await Review.findOneAndDelete({ _id: id });

  if (!review) return res.status(400).json({ error: "No such review exists" });

  res.status(200).json(review);
};

const updateReview = async (req, res) => {
  const { id } = req.params.reviewId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review exists" });
  }

  const review = await Review.findOneAndUpdate({ _id: id }, {});

  if (!review) return res.status(400).json({ error: "No such review exists" });

  res.status(200).json(review);
};

export { createReview, getReviews, getSingleReview, deleteReview, updateReview };
