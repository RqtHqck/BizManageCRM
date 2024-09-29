// File uploading management
const multer = require('multer')
const moment = require('moment')  // DateNow

const storage = multer.diskStorage({
  destination(req, file, cb) {  // Folder
    cb(null, "../uploads/")
  },
  filename(req, file, cb) {  // File
    cb(null, `${file.fieldname}-${moment().format('DDMMYYYY-HHmmss_SS')}`)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
    cb(null, true)
  } else {
    cb(null, false)
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