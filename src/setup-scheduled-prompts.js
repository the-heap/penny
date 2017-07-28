const ScheduledPrompt = require("./scheduled-prompt");

function setupScheduledPrompts(env) {
  /*** Scheduled prompt setup ***/
  const scheduledPrompt = new ScheduledPrompt({
    // cronSchedule: "*/2 * * * * *", // make prompt every 2 seconds for testing
    cronSchedule: "0 0 18 * * *", // make 1 prompt each day at 6pm UTC
    env
  });

  // start listening for new prompts
  scheduledPrompt.on(ScheduledPrompt.PROMPT_EVENT, function(prompt) {
    // console.log("here's the prompt:", prompt);

    /**
     * Don't bother sending messages if bot is disconnected. Doing that
     * repeatedly leads to errors.
     *
     * Sometimes `connected` is incorrect, maybe it is only updated when a
     * message fails to go through? I haven't seen sending a message cause a
     * crash when connected is `true` but internet connection is disabled.
     * Crashes happen when connected is `false` and my internet connection is
     * disabled.
     */
    if (!env.rtm.connected) return;

    // send the prompt to the hardcoded #draw_it channel
    env.rtm.sendMessage(prompt, "C63GFH05V").catch(error => {
      console.error("error sending message", error);
    });
  });
}

module.exports = setupScheduledPrompts;
