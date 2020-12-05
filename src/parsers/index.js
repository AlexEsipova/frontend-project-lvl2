import _ from 'lodash';
import yaml from 'js-yaml';
import parseIni from './ini.js';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: parseIni,
};

export default (data, format) => {
  if (!_.has(parsers, format)) {
    throw new Error(`Unknown format '${format}'`);
  }
  return parsers[format](data);
};
