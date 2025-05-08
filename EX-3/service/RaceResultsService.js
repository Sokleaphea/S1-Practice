
import { Duration } from "../model/Duration.js";
import { RaceResult } from "../model/RaceResult.js";
import fs from 'fs';
import path from 'path';

/**
 * This class handle the race results management system.
 */
export class RaceResultsService {
  /**
   * The list of race results.
   * @type {Array<RaceResult>}
   * @private
   */
  _raceResults = [];

  get raceResults() {
    return this._raceResults;
  }

  /**
   * Adds a new race result to the race list.
   * @param {RaceResult} result - The prace result.
   */
  addRaceResult(result) {
    // TODO
    if (result instanceof RaceResult) {
      this._raceResults.push(result);
    } else {
      throw new Error("Invalid RaceResult object.");
    }
  }

  /**
   * Saves the race results list to a JSON file.
   * @param {string} filePath - The path to the file where data should be saved.
   */
  saveToFile(filePath = '../../data/raceScores.json') {
    // TODO
    const fullPath = path.resolve(filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Prepare data for saving
    const data = this._raceResults.map(result => ({
      participantId: result.participantId,
      sport: result.sport,
      duration: result.duration.toJSON()
    }));

    // Save in pretty-printed format
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf-8');
  }

  /**
   * Loads the race results list from a JSON file.
   * @param {string} filePath - The path to the file to load data from.
   * @returns {boolean} True if loading was successful, false otherwise.
   */
  loadFromFile(filePath = '../data/raceScores.json') {
    // TODO
    try {
      const json = fs.readFileSync(path.resolve(filePath), 'utf-8');
      const data = JSON.parse(json);
      this._raceResults = data.map(entry => new RaceResult(
        entry.participantId,
        entry.sport,
        Duration.fromJSON(entry.duration)
      ));
      return true;
    } catch (error) {
      console.error("Error loading file:", error.message);
      return false;
    }
  }

  /**
   * Retrieves the race time for a given participant and sport.
   * @param {string} participantId - Participant ID.
   * @param {string} sport - Sport name.
   * @returns {Duration|null} Duration if found, else null.
   */
  getTimeForParticipant(participantId, sport) {
       // TODO
      const result = this._raceResults.find(
        r => r.participantId === participantId && r.sport === sport
      );
      return result ? result.duration : null;
  }

  /**
   * Computes the total time for a given participant by summing their race times.
   * @param {string} participantId - The ID of the participant.
   * @returns {Duration|null} The total Duration object if found, otherwise null.
   */
  getTotalTimeForParticipant(participantId) {
        // TODO
        const results = this._raceResults.filter(r => r.participantId === participantId);
        if (results.length === 0) return null;
      
        return results.reduce((total, r) => total.plus(r.duration), new Duration(0));
  }
}
