import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import {  RequestHandler } from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import configKeys from '../../../config';

interface CloudinaryStorageOptions {
  cloudinary: any; // Adjust the type as needed for the cloudinary object
  params: {
    resource_type: string;
    allowed_formats: string[];
    folder: string; // Specify the folder where the images will be stored in Cloudinary
  };
}

// Cloudinary configuration
cloudinary.config({
  cloud_name: configKeys.CLOUDINARY_CLOUD_NAME,
  api_key: configKeys.CLOUDINARY_API_KEY,
  api_secret: configKeys.CLOUDINARY_API_SECRET
});

// Function to configure Multer for handling single or multiple images
function configureMulter(field: string, limit: number): RequestHandler {
  const storageOptions: CloudinaryStorageOptions = {
    cloudinary: cloudinary,
    params: {
      resource_type: 'auto',
      allowed_formats: ['jpg', 'jpeg', 'png'],
      folder: 'your-folder-name' // Specify the folder where the images will be stored in Cloudinary
    }
  };

  const storage = new CloudinaryStorage(storageOptions);
  return multer({ storage: storage }).array(field, limit);
}

export const uploadSingle: RequestHandler = configureMulter('image', 1);

export const uploadMultiple: RequestHandler = configureMulter('images', 5);
