const express=require('express');
const cors = require('cors');
var multer = require('multer');
const app=express();
const PORT=process.env.PORT || 5000;

app.use(cors());

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}` )
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, '/Users/netappdpg/learning/UI develop/react-fileupload-client-server/client/public')
  },
  filename: function (req, file, cb) {
      console.log(file.originalname);
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file');

app.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});