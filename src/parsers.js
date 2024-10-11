import yaml from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
};

const parseToJSObject = (data, extention) => {
  const parse = parsers[extention];
  if (!parse) throw new Error('Внимание! Этот формат файла не поддерживается!');
  return parse(data);
};

export default parseToJSObject;
