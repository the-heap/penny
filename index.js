// ===========================
// Project setup!
// ===========================

// NATIVE NODE LIBRARIES
const readline = require("readline");

// THIRD PARTY LIBRARIES
const RtmClient = require("@slack/client").RtmClient;
const CLIENT_EVENTS = require("@slack/client").CLIENT_EVENTS;
const RTM_EVENTS = require("@slack/client").RTM_EVENTS;

// CONSTANTS
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// VARIABLES
var bot_token = process.env.SLACK_BOT_TOKEN || "";

// check if slack bot token env var exists before booting the program
if (process.env.SLACK_BOT_TOKEN) {
  init_bot();
} else {
  rl.question("Please provide your SLACK_BOT_TOKEN for your team: ", answer => {
    bot_token = answer;
    rl.close();
    init_bot();
  });
}

// ===========================
// Bot setup!
// ===========================

function init_bot() {
  console.log("Initializing Penny...");

  /*** BOT variables and Constants ***/

  var rtm = new RtmClient(bot_token);
  let channel;

  /*** Real Time Event Handlers ***/

  // Function to handle the bot's authentication:
  // Sets the channel that Penny can activate in.
  // TODO: Allow penny to operate in multiple channels
  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function(rtmStartData) {
    console.log(
      `Starting ${rtmStartData.self.name} for  ${rtmStartData.team.name}`
    );
    for (let c of rtmStartData.channels) {
      if (c.is_member && c.name === "draw_it") {
        channel = c.log;
      }
    }
  });

  // Handle Receiving a message
  rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
    console.log("Message:", message);
  });

  // Handle the connection opening
  rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function() {
    // rtm.sendMessage("Hello I am Penny, I just connected from the server!", 'C63GFH05V');
  });

  rtm.start();
}
