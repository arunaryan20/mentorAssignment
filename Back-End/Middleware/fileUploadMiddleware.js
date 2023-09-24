const multer = require('multer')

  storage=multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      let fileName = file.fieldname + '-' + Date.now() + '.jpg'
      cb(null, fileName)
    }
  })
  const upload = multer({ storage: storage }).array("Img",2)

module.exports = upload
