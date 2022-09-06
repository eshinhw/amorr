import express from 'express';
import colors from 'colors';
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// import apis here
import posts from "./routes/postRoute.js";
import providers from "./routes/providerRoute.js";
import reviewRoutes from "./routes/reviewRoute.js";
import customers from "./routes/customerRoute.js";
import imageRoute from "./routes/imageRoute.js";
import calendars from "./routes/calendarRoute.js";
import orderRoute from "./routes/orderRoute.js";
import issueRoute from "./routes/issueRoute.js";
import serviceRoute from "./routes/serviceRoute.js";

import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

// used on get the .env file
dotenv.config();

// set up PORT
const port = process.env.PORT;

// connect the database here
connectDB();

const app = express();

// to get post request from frontend
app.use(cors());

// to retrieve data from postman to be not undefined.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// use the routes here
app.use('/api/posts', posts);
app.use('/api/providers', providers);
app.use('/api/reviews', reviewRoutes);
app.use('/api/customers', customers);
app.use('/api/calendars', calendars);
app.use("/file", imageRoute);
app.use("/api/orders", orderRoute);
app.use("/api/issues", issueRoute);
app.use("/api/services", serviceRoute);

// get client id of PayPal
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// handle the error here, make sure it is the last one!!!
// app.use(notFoundHandler);
app.use(errorHandler);

// take frontend content (static asset) to backend. but if you modified frontend, then it needs to re-run npm run build in frontend folder everytime.
// thus used for deployment in future. if uncomment below, just visit port:500 would show content of port:3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log('directory-name 👉️', __dirname);
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );  
}

app.listen(port, () => {
  console.log(
    `Server started under ${process.env.NODE_ENV} on port ${port}`.yellow.bold
  );
});
