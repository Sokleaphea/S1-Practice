import { Duration } from "./Duration.js";
/**
 * This class handle a single race time for a given particicpant and sport type
 */
export class RaceResult {

     // TODO
      /**
     * Creates a new RaceResult instance.
     * @param {string} participantId - The participant's unique ID.
     * @param {string} sport - The type of sport (e.g., 'running', 'cycling').
     * @param {Duration} duration - The duration object representing the race time.
     */
     // TODO
     constructor(participantId, sport, duration) {
     this.participantId = participantId;
     this.sport = sport;
     this.duration = duration instanceof Duration ? duration : new Duration(duration);
}
  }