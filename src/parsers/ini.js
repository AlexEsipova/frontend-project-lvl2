import _ from 'lodash';
import ini from 'ini';

const isLikeNumber = (str) => /^[0-9]+$/.test(str);

const transformNumbers = (data) => _.mapValues(data, (item) => {
  if (_.isObject(item)) {
    return transformNumbers(item);
  }
  return isLikeNumber(item) ? Number(item) : item;
});

export default (data) => transformNumbers(ini.parse(data));
