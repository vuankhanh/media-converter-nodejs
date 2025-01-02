const ImageConverterUtil = require('../util/image_converter.util');

const defaultSize = {
  newWidth: 900,
  newHeight: 1200
}

const defaultThumbnailSize = 250;

class ImageService {
  static async convertImage(file) {
    try {
      return await ImageConverterUtil.resize(file, defaultSize);
    } catch (error) {
      throw new Error('Error when converting image');
    }
  }

  static async thumbnail(file) {
    try {
      return await ImageConverterUtil.thumbnail(file.buffer, defaultThumbnailSize);
    } catch (error) {
      throw new Error('Error when converting thumbnail');
    }
  }

  static async animatedGif(files) {
    try {
      const newWidth = Math.floor(defaultSize.newWidth / 2);
      const newHeight = Math.floor(defaultSize.newHeight / 2);
  
      const newSize = {
        newWidth,
        newHeight
      }
      return await ImageConverterUtil.combineToAnimatedGif(files, newSize);
    } catch (error) {
      return new Error('Error when converting animated gif');
    }
  }
}

module.exports = ImageService;