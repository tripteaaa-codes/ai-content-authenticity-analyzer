const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "backend/uploads/");
    },

    filename: (req, file, cb) =>{
        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );
    }
});

const fileFilter = (req, file, cb) => {
    const alllowed = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "video/mp4",
        "video/mov",
        "video/avi"
    ];
    
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Unsupported file type"));
    }
};

const upload = multer({ 
    storage,
    fileFilter 
});

module.exports = upload;