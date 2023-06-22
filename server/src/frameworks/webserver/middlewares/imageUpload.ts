import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { RequestHandler } from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import configKeys from '../../../config';

// Cloudinary configuration
cloudinary.config({
  cloud_name: configKeys.CLOUDINARY_CLOUD_NAME,
  api_key: configKeys.CLOUDINARY_API_KEY,
  api_secret: configKeys.CLOUDINARY_API_SECRET
});

// Function to configure Multer for handling single or multiple images
function configureMulter(field: string, limit: number, resourceType: string, allowedFormats: string[]): RequestHandler {
  const storageOptions = {
    cloudinary: cloudinary,
    params: {
      resource_type: resourceType,
      allowed_formats: allowedFormats,
      folder: 'your-folder-name' // Specify the folder where the images or videos will be stored in Cloudinary
    }
  };

  const storage = new CloudinaryStorage(storageOptions);
  return multer({ storage: storage }).array(field, limit);
}

// Function to configure Multer for handling images
function configureImageMulter(field: string, limit: number): RequestHandler {
  const resourceType = 'image'; // Specify the resource type as 'image' for images
  const allowedFormats = ['jpg', 'jpeg', 'png'];

  return configureMulter(field, limit, resourceType, allowedFormats);
}

// Function to configure Multer for handling videos
function configureVideoMulter(field: string, limit: number): RequestHandler {
  const resourceType = 'video'; // Specify the resource type as 'video' for videos
  const allowedFormats = ['mp4', 'mov']; // Add supported video formats here

  return configureMulter(field, limit, resourceType, allowedFormats);
}

// Function to configure Multer for handling both image and video uploads
function configureImageAndVideoMulter(field: string, limit: number): RequestHandler {
  const resourceType = 'auto'; // Specify the resource type as 'auto' to handle both images and videos
  const allowedFormats = ['jpg', 'jpeg', 'png', 'mp4', 'mov']; // Add supported formats for both images and videos

  return configureMulter(field, limit, resourceType, allowedFormats);
}

export const uploadSingleImage: RequestHandler = configureImageMulter('image', 1);
export const uploadMultipleImages: RequestHandler = configureImageMulter('images', 5);

export const uploadSingleVideo: RequestHandler = configureVideoMulter('video', 1);
export const uploadMultipleVideos: RequestHandler = configureVideoMulter('videos', 5);

export const uploadImageAndVideo: RequestHandler = configureImageAndVideoMulter('files', 2);
