import * as fs from "fs";
import sharp from "sharp";
import { Request, Response } from 'express'
import { uploadImageToS3 } from "../utils/helper";

const uploadImage = async (
    req: Request,
    res: Response
) => {
    fs.access("./uploads", async (error) => {
        if (error) {
            fs.mkdirSync("./uploads");
        }
    });
    const { buffer, originalname } = req.file as Express.Multer.File;
    const ref = `${originalname}.webp`;
    const filePath = `./uploads/${ref}`;

    await sharp(buffer).webp({ quality: 80 }).toFile(filePath);
    const uploadImgLoc = await uploadImageToS3(filePath);
    fs.unlinkSync(filePath);

    res.status(200).json({ uploadImgLoc });
}

export default {
    uploadImage,
}
