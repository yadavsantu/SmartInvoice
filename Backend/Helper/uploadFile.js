const multer = require("multer");
const fs = require('fs');
const path = require('path');

// Ensure the 'logos' folder exists
const folderPath = 'logos/';
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    const newFilename = file.fieldname + "-" + uniqueSuffix + fileExtension;
    cb(null, newFilename);
  },
});

const upload = multer({ storage: storage });

const uploadFile = (req, res, next) => {
  const singleUpload = upload.single("logo");

  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    console.log("Uploaded file", req.file); // Log after the upload is complete
    next();
  });
};

module.exports = uploadFile;
