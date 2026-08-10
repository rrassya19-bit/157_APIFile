const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" +file.originalname;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpg|jpeg|png/;

    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Hanya file JPG, JPEG, dan PNG yang diperbolehkan."));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { 
        fileSize: 5 * 1024 * 1024 // Batas ukuran file 5MB
    } 
});

module.exports = upload;