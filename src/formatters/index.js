import _ from 'lodash';
import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: JSON.stringify,
};

export default (diff, format) => {
  if (!_.has(formatters, format)) {
    throw new Error(`Unknown format ${format}`);
  }
  return formatters[format](diff);
};
