import path from 'path';
import fs from 'fs';
import resultConclusion from './formatters/index.js';
import parsers from './parsers.js';
import getTree from './getTree.js';

const getCurrentWorkDir = () => process.cwd();
const getAbsolutePathFile = (filepath) => path.resolve(getCurrentWorkDir(), filepath);

const getObj = (pathFile) => {
  const datasFile = fs.readFileSync(pathFile, 'utf-8');
  const extentionFile = path.extname(pathFile);
  return parsers(datasFile, extentionFile);
};

const genDiff = (filepath1, filepath2, format) => {
  const absolutePathToFile1 = getAbsolutePathFile(filepath1);
  const absolutePathToFile2 = getAbsolutePathFile(filepath2);
  const obj1 = getObj(absolutePathToFile1);
  const obj2 = getObj(absolutePathToFile2);
  const difTree = getTree(obj1, obj2);
  return resultConclusion(difTree, format);
};
export default genDiff;
