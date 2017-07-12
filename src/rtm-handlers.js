const fs = require("fs");
const prompts = require("./prompt-handlers");
const RtmClient = require("@slack/client").RtmClient;
const CLIENT_EVENTS = require("@slack/client").CLIENT_EVENTS;
const RTM_EVENTS = require("@slack/client").RTM_EVENTS;

// Create the RTM client from third party library
// This is where methods like `rtm.on('XYZ')` come from.
function createClient() {
  return new RtmClient(process.env.SLACK_BOT_TOKEN || "");
}

// On authentication
function onAuthentication(env) {
  env.rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function(rtmStartData) {
    for (let c of rtmStartData.channels) {
      if (c.is_member && c.name === "draw_it") {
        env.channel = c.log;
      }
    }

    // Find penny and assign to the global object
    for (let u of rtmStartData.users) {
      if (u.name === "penny_bot") {
        env.penny = u;
      }
    }
  });
}

// Function to run when Connection opens.
function onOpenConnection(env) {
  env.rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function() {
    /* rtm.sendMessage("Hello I am Penny, I just connected from the server!", "C63GFH05V"); */
  });
}

// Handle receiving a message
// Check if the message includes penny's ID. If it does, send a message to the draw_it channel
function onReceiveMessage(env) {
  env.rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
    function checkMessage(msg) {
      return message.text.includes(msg);
    }
    // TODO: Turn this into a nice ol' switch case
    if (message.text.includes(`<@${env.penny.id}>`)) {
      let responseText = "";
      switch (true) {
        case checkMessage("give prompt"):
          env.rtm.sendMessage(prompts.getRandom(env), "C63GFH05V");
          break;
        case checkMessage("submit prompt"):
          let submitPromptText = message.text.substr(27, message.text.length);

          fs.readFile("prompts.json", "utf8", function(err, data) {
            let json = JSON.parse(data);
            json.prompts.push(submitPromptText);
            fs.writeFileSync("prompts.json", JSON.stringify(json), "utf8");
          });

          env.rtm.sendMessage(
            `Prompt submitted: ${submitPromptText}`,
            "C63GFH05V"
          );
          break;
        default:
          responseText =
            "Hi I'm Penny; I can do the following if you `@` mention me!\n";
          responseText += "`@penny_bot give prompt` \n";
          responseText += "`@penny_bot, submit prompt '<your prompt here>'`";
          env.rtm.sendMessage(responseText, "C63GFH05V");
      }
    }
  });
}

function startRtm(env) {
  env.rtm.start();
}

module.exports = {
  createClient,
  onAuthentication,
  onOpenConnection,
  onReceiveMessage,
  startRtm
};
