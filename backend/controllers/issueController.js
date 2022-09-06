import asyncHandler from 'express-async-handler';

import Issue from "../models/issueModel.js";

const postIssue = asyncHandler(async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let issue = req.body.issue;

    if (!name || !email || !issue) {
        res.status(400);
        throw new Error("please add all fields name, email, and issue");
      }

    const newissue = await Issue.create({
        name,
        email,
        issue
    });
    
    if (newissue) {
        res.status(200).json(newissue);
    } else {
        res.status(400);
        throw new Error("problem with creating issue (Invalid issue data)");
    }
  });

  export { postIssue };