import { parseData } from './parsers.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatter) => {
  try {
    const data1 = parseData(filepath1);
    const data2 = parseData(filepath2);

    if (data1 === null || data2 === null) {
      console.error('Error processing files: wrong extension or unsupported file type');
      return false;
    }

    return format(data1, data2, formatter);
  } catch (error) {
    console.error('Error processing files:', error.message);
    return false;
  }
};

export default genDiff;
