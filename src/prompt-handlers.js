const fs = require("fs");

function savePrompt() {}

function load(env) {
  return JSON.parse(fs.readFileSync("prompts.json", "utf8")).prompts;
}

function getRandom(env) {
  return env.prompts[Math.floor(Math.random() * env.prompts.length)];
}

module.exports = {
  load,
  getRandom
};
