
const express = require('express')
const app = express()
const port = 8080
const multer  = require('multer')
const upload = multer()
const exifr = require('exifr')
const fs = require('fs')
var ExifImage = require('exif').ExifImage;

parseExif = (data) => {
  dataObjs = [data.image, data.thumbnail, data.exif, data.gps, data.makernote]
  returnStr = ""
  for (obj in dataObjs){
    console.log(dataObjs[obj])
    if(dataObjs[obj]){
      for (const [key, value] of Object.entries(dataObjs[obj])){
        if(key != "MakerNote" && key != 'UserComment'){
          returnStr = returnStr.concat(`${key}: ${value}\n`);
        }
      }
      returnStr.concat('\n')
    }
  }
  return returnStr
}

app.post('/', upload.single('file'), async (req, res, next) => {
  let buffer = req.file.buffer
  let errMsg = "could not parse image file. Has the image been digititally altered?"
  try {
    new ExifImage({image : buffer},  (error, exifData) => {
        if (error)
            console.log('Error: ' + error.message);
        else
            var data = parseExif(exifData)
            res.header('Access-Control-Allow-Origin', '*')
            try{
              if(data){
              console.log(data)
              res.send(data)
              }
              else{
                res.send(errMsg)
              }
            }
            catch{
              res.send(errMsg)
            }
    });
  }catch (error) {
      console.log('Error: ' + error.message);
  }

})


app.listen(port, () => {
  console.log(`Exif server listening on port ${port}`)  
})
