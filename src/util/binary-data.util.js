const Readable = require('stream').Readable;

class BinaryDataUtil {
  static bufferToStream(buffer) {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }

  static concatBuffersToStream(buffers) {
    const stream = new Readable();
    buffers.forEach(buffer => stream.push(buffer));
    stream.push(null);
    return stream;
  }
  
}

module.exports = BinaryDataUtil;