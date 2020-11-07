import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import { resolveIni } from './utils.js';

const iniParse = (data) => resolveIni(ini.parse(data));

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': iniParse,
};

const readFile = (file) => fs.readFileSync(file, 'utf8');

const parse = (extname, file) => parsers[extname](file);

const getExt = (fileName) => path.extname(fileName);

const formatParser = (filepath) => {
  const data = readFile(filepath);
  const extension = getExt(filepath);
  return parse(extension, data);
};

export default formatParser;
