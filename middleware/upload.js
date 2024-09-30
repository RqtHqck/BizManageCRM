// File uploading with multer settings up
const multer = require('multer')
const moment = require('moment')  // DateNow
const path = require('path')

const storage = multer.diskStorage({
  destination(req, file, cb) {  // Folder
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename(req, file, cb) {  // File
    cb(null, `${file.fieldname}-${moment().format('DDMMYYYY-HHmmss_SS')}`)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Неверный тип файла. Разрешены только PNG и JPG.'), false);
  }
} 

const limits = {
  fileSize: 1024 * 1024 * 5
}

module.exports = multer({
  storage,
  fileFilter,
  limits,
})