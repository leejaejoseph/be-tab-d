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

const uploadsMiddleware = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.csv$/)) {
      return callback(new Error('Only CSV files are allowed!'));
    }
    callback(null, true);
  }
}).single('csv');

module.exports = uploadsMiddleware;
