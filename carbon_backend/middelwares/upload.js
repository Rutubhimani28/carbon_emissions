import multer from 'multer'
import fs from 'fs'
import path from 'path'

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const uploadDir = 'uploads/';
            fs.mkdirSync(uploadDir, { recursive: true });
            cb(null, uploadDir);
        },
        filename: function (req, file, cb) {
            const uploadDir = 'uploads/images';
            const filePath = path.join(uploadDir, file.originalname);

            // Check if the file already exists in the destination directory
            if (fs.existsSync(filePath)) {
                // For example, you can append a timestamp to the filename to make it unique
                const timestamp = Date.now() + Math.floor(Math.random() * 90);
                cb(null, file.originalname.split('.')[0] + '-' + timestamp + '.' + file.originalname.split('.')[1]);
            } else {
                cb(null, file.originalname);
            }
        },
    })
});

export default upload