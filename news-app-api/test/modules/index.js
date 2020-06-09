const requireDirectory = require("require-directory");

const rename = name => {
  return `${name.toLowerCase()}Module`;
};
// Renaming module directories to not confuse with model names
module.exports = requireDirectory(module, { rename });
