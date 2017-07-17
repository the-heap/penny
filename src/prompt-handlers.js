const fs = require("fs");

function savePrompt() {}

// Load up file of prompts
function load(env) {
  return JSON.parse(fs.readFileSync("prompts.json", "utf8")).prompts;
}

// Suggest random picture to draw
function getRandom(env) {
  return env.prompts[Math.floor(Math.random() * env.prompts.length)];
}

module.exports = {
  load,
  getRandom
};
