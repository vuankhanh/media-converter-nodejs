const express = require('express');
const multer = require('multer');

const logger = require('./middlware/logger');

const ImageService = require('./service/image.service');
const SortUtil = require('./util/sort.util');

const app = express();

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`); 
  next();
});

const upload = multer({ storage: multer.memoryStorage() });

app.post('/resize', upload.single('image'), async (req, res) => {
  const file = req.file;
  try {
    const fileConverted = await ImageService.convertImage(file);
    res.contentType('image/webp');
    res.send(fileConverted);
  } catch (error) {
    res.status(error)
  }
});

app.post('/thumbnail', upload.single('image'), async (req, res) => {
  const file = req.file;
  const sizeWidth = req.query.sizeWidth || 250;
  try {
    const fileConverted = await ImageService.thumbnail(file, sizeWidth);
    res.contentType('image/webp');
    res.send(fileConverted);
  } catch (error) {
    res.status(error)
  }
});

app.post('/animated-gif', upload.array('images'), async (req, res) => {
  const files = SortUtil.sortArray(req.files);
  try {
    const fileConverted = await ImageService.animatedGif(files);
    res.contentType('image/gif');
    res.send(fileConverted);
  } catch (error) {
    res.status(error)
  }
});

app.listen(3009, () => {
  console.log('Server is running on port 3009');
});