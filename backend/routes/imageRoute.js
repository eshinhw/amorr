import upload from "../middleware/upload.js"
import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import Grid from "gridfs-stream";
import dotenv from 'dotenv';
dotenv.config();

let gfs;
let gridFSBucket;
const conn = mongoose.connection;
conn.once("open", ()=>{
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("test");
    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
    });

});

//Stores image into DB
// POST /file/upload
router.post("/upload", upload.single('file'), async (req, res) => {
    if (req.file === undefined) return res.send("Select an image to upload.");
    const imgUrl = `http://localhost:${process.env.PORT}/file/${req.file.filename}`;
    return res.send({data:imgUrl, image_id:req.file.filename});
});

//Displays the image on browser
// http://localhost:<PORT in env>/file/<filename>
//GET /file/filename
router.get("/:filename", async (req, res) => {
  try {
      const filename= {filename: req.params.filename};
      const images = conn.db.collection("photos.files");
      const query = filename.valueOf();
      const options = { projection: {_id: 1}};
      const file = await images.findOne(query, options);
      const readStream = gridFSBucket.openDownloadStream(file._id);
      readStream.pipe(res);
  } catch (error) {
      console.log(error);
      res.send("Image not found.");
  }
});

// Deletes image
// DELETE /file/filename
router.delete("/:filename", async (req, res) => {
  try {
      const filename= {filename: req.params.filename};
      const images = conn.db.collection("photos.files");
      const query = filename.valueOf();
      const options = { projection: {_id: 1}};
      const file = await images.findOne(query, options);
      const id = file._id;
      await gridFSBucket.delete(id);
      res.send("Successfully deleted.");
  } catch (error) {
      res.send("An error occurred.");
  }
});

export default router;