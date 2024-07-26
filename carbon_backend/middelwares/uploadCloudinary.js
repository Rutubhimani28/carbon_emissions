// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import 'dotenv/config';

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET
// });

// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: 'carbon_emission',
//         allowedFormats: ['jpeg', 'png', 'jpg'],
//     }
// });

// export default storage;

import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import 'dotenv/config';

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// Multer configuration for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'carbon_emission',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    },
});

console.log("----- storage ", storage)

const uploadCloudinary = multer({ storage });

export default uploadCloudinary;