const sharp = require('sharp');

class ImageConverterUtil {
  constructor() { }

  static async resize(file) {
    if(!file.buffer) return Promise.reject('File buffer is empty');
    const metaData = await sharp(file.buffer).metadata();

    //Nếu metaData có width là 3000 thì lấy thừa số là 0.7
    // Nếu metaData có width là 9000 thì lấy thừa số là 0.23

    let factor = metaData.width >= 9000 ? 0.20 : 0.7;
    const newWidth = Math.round(metaData.width * factor);
    const newHeight = Math.round(metaData.height * factor);
    return await sharp(file.buffer)
    .rotate()
    .resize(newWidth, newHeight)
    .webp()
    .toBuffer();
  }

  static async thumbnail(buffer, sizeWidth) {
    return await sharp(buffer).resize({ width: sizeWidth }).withMetadata().toBuffer();
  }
}

module.exports = ImageConverterUtil;