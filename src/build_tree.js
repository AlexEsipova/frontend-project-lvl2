const resolveSpacesKey = (item) => {
  const space = '  ';
  if (item.startsWith('  ') || item.startsWith('+ ') || item.startsWith('- ')) {
    return item;
  }
  return `${space}${item}`;
};

const buildTree = (value, replacer = '    ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object') {
      return `${currentValue}`;
    }
    const deepIndentSize = depth;
    const deepIndent = replacer.repeat(deepIndentSize);
    const currentIndent = replacer.repeat(depth);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => {
        if (depth === 0) {
          return `  ${resolveSpacesKey(key)}: ${iter(val, deepIndentSize + spacesCount)}`;
        }
        return `  ${deepIndent}${resolveSpacesKey(key)}: ${iter(val, deepIndentSize + spacesCount)}`;
      });
    return [
      '{',
      ...lines,
      `${currentIndent}}`,
    ].join('\n');
  };

  return iter(value, 0);
};

export default buildTree;
