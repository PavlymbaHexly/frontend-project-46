import { parseData } from './parsers.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatter) => {
  const parseFile = (filepath) => {
    try {
      return parseData(filepath);
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  if (data1 === false || data2 === false) {
    return false;
  }

  return format(data1, data2, formatter);
};

export default genDiff;
