const fs = require("fs");
const prompts = require("./prompt-handlers");
const drawings = require("./drawing-handlers");
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
          message.channel == "C63GFH05V"
            ? env.rtm.sendMessage(prompts.getRandom(env), "C63GFH05V")
            : env.rtm.sendMessage(prompts.getRandom(env), message.channel);
          break;

        case checkMessage("submit prompt"):
          let submitPromptText = message.text.substr(27, message.text.length);

          fs.readFile("prompts.json", "utf8", function(err, data) {
            let json = JSON.parse(data);
            json.prompts.push(submitPromptText);
            fs.writeFileSync("prompts.json", JSON.stringify(json), "utf8");
          });

          message.channel == "C63GFH05V"
            ? env.rtm.sendMessage(
                `Prompt submitted: ${submitPromptText}`,
                "C63GFH05V"
              )
            : env.rtm.sendMessage(
                `Prompt submitted: ${submitPromptText}`,
                message.channel
              );
          break;

        default:
          responseText =
            "Hi I'm Penny; I can do the following if you `@` mention me!\n";
          responseText += "`@penny_bot give prompt` \n";
          responseText += "`@penny_bot, submit prompt '<your prompt here>'`\n ";
          responseText +=
            "You can also DM me your drawings as attachments with the comment `submit drawing`";

          // Channel to respond in
          message.channel == "C63GFH05V"
            ? env.rtm.sendMessage(responseText, "C63GFH05V")
            : env.rtm.sendMessage(responseText, message.channel);
      }
    }

    /**
     * DMs to penny with attachments might not include penny's user id in the
     * message, so this check happens outside the other if statement
     */
    if (checkMessage("submit drawing") && message.channel === "D63S3TAM7") {
      handleDrawingSubmission(env, message);
    }
  });
}

const validFileTypes = ["jpg", "png", "gif"];

function handleDrawingSubmission(env, message) {
  if (!message.file) {
    env.rtm.sendMessage("Where is drawing?", message.channel);
  } else if (message.file && !validFileTypes.includes(message.file.filetype)) {
    env.rtm.sendMessage(
      "I don't think you attached a drawing. Make sure you send me a .png, .jpg, or .gif",
      message.channel
    );
  } else {
    env.rtm.sendMessage("Got drawing!", message.channel);

    drawings
      .addImageToList(message.file)
      .then(result => console.log("saved image info", result))
      .catch(error => console.error("error", error));
  }
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
