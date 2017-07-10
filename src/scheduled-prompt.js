const CronJob = require("cron").CronJob;
const EventEmitter = require("events");

/**
 * Wrap up message generating & sending together in a testable class.
 * EventEmitter docs: https://nodejs.org/api/events.html Cron docs:
 * https://www.npmjs.com/package/cron
 *
 * Fun quirk with the cron library: if this bot runs in a container
 * environment that can be frozen, cron will lose track of time and run its
 * callback at the incorrect time.
 */
class ScheduledPrompt extends EventEmitter {
  constructor({ cronSchedule, promptGenerator }) {
    super();

    this.job = new CronJob(
      cronSchedule,
      () => {
        const prompt = promptGenerator.get();

        // let anything listening know there is a new prompt ready
        this.emit(ScheduledPrompt.PROMPT_EVENT, prompt);
      },
      null,
      true
    );
  }

  // it's nice to have an event name
  static get PROMPT_EVENT() {
    return "PROMPT_EVENT";
  }
}

module.exports = ScheduledPrompt;
