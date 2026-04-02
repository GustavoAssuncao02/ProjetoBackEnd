const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadPath = path.resolve(__dirname, '../../uploads/products')

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, uniqueSuffix + ext)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/
  const mimetypeOk = allowedTypes.test(file.mimetype)
  const extnameOk = allowedTypes.test(path.extname(file.originalname).toLowerCase())

  if (mimetypeOk && extnameOk) {
    return cb(null, true)
  }

  cb(new Error('Only image files are allowed'))
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
})

module.exports = upload