const buildTree = (value, replacer = '    ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object') {
      return `${currentValue}`;
    }
    const deepIndentSize = depth + spacesCount;
    const deepIndent = replacer.repeat(deepIndentSize);
    const currentIndent = replacer.repeat(depth);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => {
        if (depth === 0) {
          return `  ${key}: ${iter(val, deepIndentSize)}`;
        }
        return `${deepIndent}${key}: ${iter(val, deepIndentSize)}`;
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
