
const express = require('express')
const app = express()
const port = 8080
const multer  = require('multer')
const upload = multer()
const exifr = require('exifr')
const fs = require('fs')
var ExifImage = require('exif').ExifImage;

parseExif = (data) => {
  return data
}

app.post('/', upload.single('file'), async (req, res, next) => {
  let buffer = req.file.buffer
  try {
    new ExifImage({image : buffer},  (error, exifData) => {
        if (error)
            console.log('Error: ' + error.message);
        else
            data = parseExif(exifData)
            console.log(data)
            res.header('Access-Control-Allow-Origin', '*')
            res.json(data)
    });
  }catch (error) {
      console.log('Error: ' + error.message);
  }

})


app.listen(port, () => {
  console.log(`Exif server listening on port ${port}`)  
})
