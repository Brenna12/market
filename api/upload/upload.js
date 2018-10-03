const IncomingForm = require('formidable').IncomingForm;
let multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/dest')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + ".png")
    }
  })
  
  var upload = multer({ storage: storage })

 module.exports = upload;
// module.exports = function upload(req, res) {
//     var form = new IncomingForm();

// form.on('file', (field, file) => {
//     console.log(file);
//     console.log(field);
// });
// form.on('end', () => {
//     res.json();
//     console.log(res.json());
// });
// form.parse(req);
// };