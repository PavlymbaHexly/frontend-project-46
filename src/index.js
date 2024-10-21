import path from 'path';
import { parseData } from './parsers.js';
import formatDiff from './formatters/index.js';
import { createDiff } from './utility.js';

const genDiff = (file1, file2, format) => {
  const ext1 = path.extname(file1);
  const ext2 = path.extname(file2);

  if (!['.json', '.yml', '.yaml'].includes(ext1) || !['.json', '.yml', '.yaml'].includes(ext2)) {
    throw new Error(`Unsupported file format: ${ext1} or ${ext2}`);
  }

  const data1 = parseData(file1);
  const data2 = parseData(file2);

  const diff = createDiff(data1, data2);
  return formatDiff(diff, format);
};

export default genDiff;
