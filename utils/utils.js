function normalizeString(str) {
  return str.trim()
            .replace(/[0-9]|[·~,.、。，《》（）()?？！!*-_="“”']/g, '')
            .replace(/\s+/g, '')
}

module.exports = {
  normalizeString
}