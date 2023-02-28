const path = require('path');
const multer = require('multer');

const csvDirectory = path.join(__dirname, 'public/csv');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, csvDirectory);
  },
  filename: (req, file, callback) => {
    const fileExtension = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}${fileExtension}`;
    callback(null, name);
  }
});

const uploadsMiddleware = multer({ storage }).single('csv');

module.exports = uploadsMiddleware;
