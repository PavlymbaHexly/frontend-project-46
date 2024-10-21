const formatStylish = (diff) => JSON.stringify(diff, null, 2);

const formatPlain = (diff) => JSON.stringify(diff, null, 2);

const formatJSON = (diff) => JSON.stringify(diff, null, 2);

const formatDiff = (diff, format) => {
  switch (format) {
    case 'stylish':
      return formatStylish(diff);
    case 'plain':
      return formatPlain(diff);
    case 'json':
      return formatJSON(diff);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default formatDiff;
