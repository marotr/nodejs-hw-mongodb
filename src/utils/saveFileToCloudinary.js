import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'node:fs/promises';
dotenv.config();



cloudinary.v2.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file);
  await fs.unlink(file);
  return response.secure_url;
};


