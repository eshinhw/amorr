import {
    postIssue
} from "../controllers/issueController.js";

import express from "express";
  
const router = express.Router();
  
router.post("/post-issue", postIssue);
  
export default router;
  