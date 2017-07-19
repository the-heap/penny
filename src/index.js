/* Welcome and Intro
   - This is the entry file where our slack bot is created and initialized.
   - If you get lost, looks for big comment blocks like this one, and read them.
   - If you get lost, ask questions in our slack channel: https://penny-woyvoplzst.now.sh/
   - If you're looking for something to work on, grab an issue here: https://github.com/the-heap/penny/issues

 * Project Resources *
   - Node Slack SDK / API resources : https://slackapi.github.io/node-slack-sdk/
   - Node Slack SDK RTM examples: https://github.com/slackapi/node-slack-sdk
   - If you are unsure of how to contribute to open source, please checkout this resource: http://theheap.us/page/resources/
  =========================== */

// TODO:   // refactor: this should be a function so we can dynamically get set prompts?,

// ===========================
// Project setup!
// ===========================

// NATIVE NODE LIBRARIES
const readline = require("readline");
const fs = require("fs");
const RtmClient = require("@slack/client").RtmClient;
const rtmHandlers = require("./rtm-handlers");
const prompts = require("./prompt-handlers");

// FOR SCHEDULED DRAWING PROMPTS
const setupScheduledPrompts = require("./setup-scheduled-prompts");

// CONSTANTS
const READLINE = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// env == Envelope. Holds all our domain data. Important!
// This object gets passed around a lot in function params.
var env = {
  prompts: prompts.load(), // write function that reloads this?
  rtm: rtmHandlers.createClient(), // create new RTM client for all handlers.
  penny: undefined, // Our bot and all it's properties.
  channel: undefined // the channel(s) penny can live in.
};

// check if slack bot token env var exists before booting the program
if (process.env.SLACK_BOT_TOKEN) {
  init_bot();
} else {
  READLINE.question(
    "Please provide your SLACK_BOT_TOKEN for your team: ",
    answer => {
      bot_token = answer;
      READLINE.close();
      init_bot();
    }
  );
}

// ===========================
// Bot setup!
// ===========================

/**
 * This function sets up and runs our bot. 
 */
function init_bot() {
  console.log("Initializing Penny...");

  // rtmHandlers (real time message handlers)
  rtmHandlers.onAuthentication(env);
  rtmHandlers.onReceiveMessage(env);
  rtmHandlers.startRtm(env);

  setupScheduledPrompts(env);
}
