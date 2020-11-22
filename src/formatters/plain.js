import _ from 'lodash';

const stringify = (item) => {
  if (typeof item === 'string') {
    return `'${item}'`;
  }
  if (_.isPlainObject(item)) {
    return '[complex value]';
  }
  return `${item}`;
};

const buildPlain = (array) => {
  const iter = (currentValue, path) => {
    const lines = currentValue
      .flatMap(({
        key, type, value, children, value1, value2,
      }) => {
        const newPath = [...path, key];
        const strings = {
          parent: () => iter(children, newPath),
          changed: () => [`Property '${newPath.join('.')}' was updated. From ${stringify(value1)} to ${stringify(value2)}`],
          added: () => [`Property '${newPath.join('.')}' was added with value: ${stringify(value)}`],
          deleted: () => [`Property '${newPath.join('.')}' was removed`],
          unchanged: () => [],
        };
        if (!_.has(strings, type)) {
          throw new Error(`Unknowm type '${type}'`);
        }
        return strings[type]();
      });

    return lines.join('\n');
  };
  return iter(array, []);
};

export default buildPlain;
