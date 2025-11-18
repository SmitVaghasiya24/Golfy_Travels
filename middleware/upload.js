import multer from 'multer';
import path from 'path';
import fs from 'fs';

const getMulterUploader = (folderName = '') => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = folderName ? `uploads/${folderName}` : 'uploads';

            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }

            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
            cb(null, uniqueName);
        }
    });

    const fileFilter = (req, file, cb) => {
        const allowedTypes = /mp4|jpeg|jpg|png|webp/;
        const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mime = allowedTypes.test(file.mimetype);
        if (ext && mime) {
            cb(null, true);
        } else {
            cb(new Error('Only image files (jpg, jpeg, png, webp) are allowed'));
        }
    };

    return multer({
        storage,
        fileFilter,
        limits: { fileSize: 10 * 1024 * 1024 } // 10MB
    });
};

export default getMulterUploader;