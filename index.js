const express = require('express');
const multer = require('multer');
const ImageConverterUtil = require('./util/image_converter.util');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.post('/resize', upload.single('image'), async (req, res) => {
  const bufferFile = req.file.buffer;

  try {
    const fileConverted = await ImageConverterUtil.resize(bufferFile);
    
    res.contentType('image/webp');
    res.send(fileConverted);
  } catch (error) {
    res.status(error)
  }
});

app.post('/thumbnail', upload.single('image'), async (req, res) => {
  const bufferFile = req.file.buffer;
  const sizeWidth = req.query.sizeWidth || 250;
  try {
    const fileConverted = await ImageConverterUtil.thumbnail(bufferFile, sizeWidth);

    res.contentType('image/webp');
    res.send(fileConverted);
  } catch (error) {
    res.status(error)
  }
});

app.listen(3009, () => {
  console.log('Server is running on port 3009');
});