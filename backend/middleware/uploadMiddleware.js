const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "backend/uploads/");
    },

    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );
    }
});

const fileFilter = (req, file, cb) => {
    console.log("Uploaded type:", file.mimetype);

    const allowed = [
        // Images
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/gif",

        // Videos
        "video/mp4",
        "video/quicktime",   // .mov
        "video/x-msvideo",   // .avi
        "video/x-matroska"   // .mkv
    ];

    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only image and video files are allowed"));
    }
};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;