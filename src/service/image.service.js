const ImageConverterUtil = require('../util/image_converter.util');
const DiskStorageUtil = require('../util/disk_storage.util');
const { join } = require('path');

const newSize = {
  newWidth: 900,
  newHeight: 1200
}

class ImageService {
  static async convertImage(file) {
    return await ImageConverterUtil.resize(file, newSize);
  }

  static async thumbnail(file, width) {
    return await ImageConverterUtil.thumbnail(file.buffer, width);
  }

  static async animatedGif(files) {
    newSize.newWidth = Math.floor(newSize.newWidth / 2);
    newSize.newHeight = Math.floor(newSize.newHeight / 2);
    try {
      return await ImageConverterUtil.combineToAnimatedGif(files, newSize);
    } catch (error) {
      return new Error('Error when converting animated gif');
      
    }
  }
}

module.exports = ImageService;