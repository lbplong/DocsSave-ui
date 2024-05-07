/** @format */

import { TYPE_FILE } from "../constants";

class FileBiz {
  /**
   * @param {number} size
   * @returns {string} 'example: 10KB'
   * 1024^3 = 1,073,741,824
   * 1024^2 = 1,048,576
   * 1 KB ~= 1024 byte ~= 1000 byte
   * 1 MB ~= 1048576 byte ~= 1000000 byte
   * 1 GB ~= 1073741824 byte ~= 1000000000 byte
   */
  formatSize(size) {
    const unitKB = 1000;
    const unitMB = 1000000;
    const unitGB = 1000000000;
    if (size > unitGB) {
      return `${(size / unitGB).toFixed(1)} GB`;
    }
    if (size > unitMB) {
      return `${(size / unitMB).toFixed(1)} MB`;
    }
    if (size > unitKB) {
      return `${(size / unitKB).toFixed(1)} KB`;
    }
    return `${size} B`;
  }

  /**
   * Format file size from byte to B, KB, MB, GB, ...
   * @param {object} files
   * @returns {object} files {{ formattedSize: '2KB', displayUploadPercent: '10%', ...}}
   */
  formatFile(files) {
    Object.values(files).forEach(file => {
      const newFile = file;
      newFile.formattedSize = this.formatSize(newFile.size);
      newFile.displayUploadPercent = `${newFile.size.toString().slice(0, 2)}%`;
      newFile.uploadPercent = newFile.size.toString().slice(0, 2);
    });
    return files;
  }

  /**
   * @param {object} files
   * @returns {string} formatted total file size (example: 245 KB)
   */
  calcTotalFileSize(files) {
    let totalSize = Object.values(files).reduce(
      (total, file) => total + file.size,
      0
    );
    totalSize = this.formatSize(totalSize);
    return totalSize;
  }

  /**
   * @param {array} destination
   * @returns {string} 'Folder 1 \ Subfolder 1 \ Subfolder 1.1'
   */
  convertToDestinationString = destination => {
    const folderNames = destination.map(e => e.text);
    return folderNames.join(" \\ ");
  };

  checkTypeOfFileSuccess = file => {
    return TYPE_FILE.filter(f => f.type === file.type).length > 0;
  };
}

export default new FileBiz();
