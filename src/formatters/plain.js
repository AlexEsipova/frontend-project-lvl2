const resolveValue = (item) => {
  if (typeof item !== 'object') {
    if (typeof item !== 'string' || item === 'null') {
      return `${item}`;
    }
    return `'${item}'`;
  }
  return '[complex value]';
};

const buildPlain = (value) => {
  const iter = (currentValue, path) => {
    if (typeof currentValue !== 'object') {
      return `${currentValue}`;
    }
    const lines = Object
      .entries(currentValue)
      .map(([key, { value1, value2, type }]) => {
        const newPath = (path === '') ? key : `${path}.${key}`;
        if (type === 'unchanged' && typeof value1 === 'object') {
          return iter(value1, newPath);
        }
        if (type === 'changed') {
          return `Property '${newPath}' was updated. From ${resolveValue(value1)} to ${resolveValue(value2)}`;
        }
        if (type === 'added') {
          return `Property '${newPath}' was added with value: ${resolveValue(value1)}`;
        }
        if (type === 'deleted') {
          return `Property '${newPath}' was removed`;
        }
        return null;
      })
      .filter((line) => line);

    return lines.join('\n');
  };

  return iter(value, '');
};

export default buildPlain;
