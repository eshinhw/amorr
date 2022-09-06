import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Provider from "../models/providerModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;


  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // get token from header 
      // Bearer {token}
      token = req.headers.authorization.split(' ')[1];

      // verify token
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // get provider from token, note here we've set the id inside function generateToken, 
      // note here: we've set the provider in req, so we can access it anywhere in future
      req.provider = await Provider.findById(decode.id).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('no token, thus not authorized');
  }
});

export default protect;