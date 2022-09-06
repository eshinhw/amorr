import multer from "multer";
import dotenv from 'dotenv';
import {GridFsStorage} from "multer-gridfs-storage";
dotenv.config();


const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        const match = ["image/png", "image/jpeg", "image/jpg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}${file.originalname}`,
        };
    },
});

export default multer({ storage });
