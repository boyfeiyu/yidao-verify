function normalizeString(inputString) {
  const lines = inputString.trim().split('\n');
  const title = lines[0];

  const normalizedString = lines
    // 去除来自页眉上的标题
    .reduce((result, line) => line === title ? result : result + line, '')
      // 去除空格、换行符、数字、标点
    .replace(/[0-9]|[·~,.、。，《》（）()?？！!*-_="“”'：；:<>{}]/g, '')
    .replace(/\s+/g, '');

  return {
    title,
    normalizedString
  }
}

module.exports = {
  normalizeString
}
