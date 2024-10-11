import path from 'path';
import fs from 'fs';
import resultConclusion from './formatters/index.js';
import parsers from './parsers.js';
import getTree from './getTree.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const parseFile = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf-8');
  return parsers(data, path.extname(filepath));
};

const genDiff = (filepath1, filepath2, format) => {
  const obj1 = parseFile(getAbsolutePath(filepath1));
  const obj2 = parseFile(getAbsolutePath(filepath2));
  return resultConclusion(getTree(obj1, obj2), format);
};

export default genDiff;
