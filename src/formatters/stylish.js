import _ from 'lodash';

const spacesCount = 4;

const getIndent = (indentSize) => ' '.repeat(indentSize);

const stringify = (value, indentSize) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const indent = getIndent(indentSize);
  const lines = Object.entries(value)
    .map(([key, child]) => `${indent}    ${key}: ${stringify(child, indentSize + spacesCount)}`);
  return `{\n${lines.join('\n')}\n${indent}}`;
};

const mapping = {
  parent: (indentSize, { key, children }, iter) => `${getIndent(indentSize)}    ${key}: ${iter(children, indentSize + spacesCount)}`,
  changed: (indentSize, { key, value1, value2 }) => [
    `${getIndent(indentSize)}  - ${key}: ${stringify(value1, indentSize + spacesCount)}`,
    `${getIndent(indentSize)}  + ${key}: ${stringify(value2, indentSize + spacesCount)}`,
  ],
  added: (indentSize, { key, value }) => `${getIndent(indentSize)}  + ${key}: ${stringify(value, indentSize + spacesCount)}`,
  deleted: (indentSize, { key, value }) => `${getIndent(indentSize)}  - ${key}: ${stringify(value, indentSize + spacesCount)}`,
  unchanged: (indentSize, { key, value }) => `${getIndent(indentSize)}    ${key}: ${stringify(value, indentSize + spacesCount)}`,
};

export default (tree) => {
  const iter = (nodes, indentSize) => {
    const lines = nodes.flatMap((node) => {
      const { type } = node;
      if (!_.has(mapping, type)) {
        throw new Error(`Unknown type '${type}'`);
      }
      return mapping[type](indentSize, node, iter);
    });
    return `{\n${lines.join('\n')}\n${getIndent(indentSize)}}`;
  };
  return iter(tree, 0);
};
