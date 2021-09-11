
const express = require('express')
const app = express()
const port = 8080
const multer  = require('multer')
const upload = multer()
const fs = require('fs')

function blobToFile(theBlob, fileName){
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}


app.post('/', upload.single('file'), function (req, res, next) {
  let file = req.file
  console.log(file)
  fs.writeFile('nodefile', file, (err) => {
    if (err) throw err;
    // success case, the file was saved
});
  
//   fs.writeFile('/file', req.file.buffer, {}, (err, res) => {
//         if(err){
//             console.error(err)
//             return
//         }
//         console.log('video saved')
//     })
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)  
})
