const sharp = require('sharp');
const GIFEncoder = require('gifencoder');
const { createCanvas, loadImage } = require('canvas');

class ImageConverterUtil {
  constructor() { }

  static async getMetadata(buffer) {
    return await sharp(buffer).metadata();
  }

  static async resize(file, { newHeight, newWidth }) {
    if (!file.buffer) return Promise.reject('File buffer is empty');
    
    return await sharp(file.buffer)
      .rotate()
      .resize(newWidth, newHeight)
      .webp()
      .toBuffer();
  }

  static async thumbnail(buffer, sizeWidth) {
    return await sharp(buffer).resize({ width: sizeWidth }).withMetadata().toBuffer();
  }

  static async combineToAnimatedGif(files, { newHeight, newWidth }) {
    const encoder = new GIFEncoder(newWidth, newHeight);
    const canvas = createCanvas(newWidth, newHeight);
    const ctx = canvas.getContext('2d');

    encoder.start();
    encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
    encoder.setDelay(200); // frame delay in ms
    encoder.setQuality(10); // image quality, 10 is default

    for (const file of files) {
      try {
        const fileBuffer = file.buffer;
        const imageBuffer = await sharp(fileBuffer).toFormat('png').toBuffer();
        const image = await loadImage(imageBuffer);
        ctx.drawImage(image, 0, 0, newWidth, newHeight);
        encoder.addFrame(ctx);
      } catch (error) {
        return new Error(`Error loading image from URL ${url}:`, error);
      }
    }

    encoder.finish();

    return encoder.out.getData();
  }
}

module.exports = ImageConverterUtil;