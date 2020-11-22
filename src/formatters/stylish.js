import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const stringify = (val, globalIndentSize) => {
  if (!_.isObject(val)) {
    return `${val}`;
  }
  const localIndentSize = globalIndentSize + spacesCount;
  const space = replacer.repeat(globalIndentSize);
  const lines = Object.entries(val)
    .map(([key, child]) => `  ${space}  ${key}: ${stringify(child, localIndentSize)}`);
  return `{\n${lines.join('\n')}\n${space}}`;
};

export default (array) => {
  const iter = (arr, globalIndentSize) => {
    const localIndentSize = globalIndentSize + spacesCount;
    const space = replacer.repeat(globalIndentSize);
    const lines = arr.flatMap((obj) => {
      const {
        key, type, children, value, value1, value2,
      } = obj;
      const strings = {
        parent: () => `  ${space}  ${key}: ${iter(children, localIndentSize)}`,
        changed: () => {
          const base = [value1, value2].map((item) => `${key}: ${stringify(item, localIndentSize)}`);
          const [item1, item2] = base;
          return [`  ${space}- ${item1}`, `  ${space}+ ${item2}`];
        },
        added: () => `  ${space}+ ${key}: ${stringify(value, localIndentSize)}`,
        deleted: () => `  ${space}- ${key}: ${stringify(value, localIndentSize)}`,
        unchanged: () => `  ${space}  ${key}: ${stringify(value, localIndentSize)}`,
      };
      return strings[type]();
    });
    return `{\n${lines.join('\n')}\n${space}}`;
  };
  return iter(array, 0);
};
