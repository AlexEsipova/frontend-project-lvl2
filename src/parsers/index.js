import yaml from 'js-yaml';
import parseIni from './ini.js';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: parseIni,
};

export default (data, format) => parsers[format](data);
