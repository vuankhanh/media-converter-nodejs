const path = require('path');
const FileUtil = require('./file.util');

class DiskStorageUtil {
  static async saveToDisk(rootPath, file) {
    await FileUtil.ensureDir(rootPath);
    
    const filePath = path.join(rootPath, file.originalname);
    await FileUtil.write(filePath, file.buffer);

    return filePath;
  }
}

module.exports = DiskStorageUtil;