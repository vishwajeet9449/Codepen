import AWS from 'aws-sdk';
import * as fs from "fs";

export const uploadImageToS3 = async (imagePath: string): Promise<string> => {
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_S3_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    });
    const blob = fs.readFileSync(imagePath);
    const imgArray = imagePath.split("/");
    const timestamp = new Date().toISOString();

    const imgName = `${timestamp}-${imgArray[2]}`;

    const uploadedImage = await s3.upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME as string,
        Key: imgName,
        Body: blob,
    }).promise();
    return uploadedImage.Location;
};