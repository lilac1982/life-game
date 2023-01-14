// eslint-disable-next-line import/no-unresolved
import { WorldRules } from './types/types';
// eslint-disable-next-line import/no-unresolved
import * as fs from 'fs';

export function readWorldConfig(fileName: string): WorldRules {
  let currentRules: WorldRules = {
    aloneCell: 2,
    birthCell: 3,
    overpopulatedCell: 3,
    worldSize: 25,
    steps: 1000,
  };

  try {
    const data = fs.readFileSync(fileName, 'utf-8');
    currentRules = JSON.parse(data.toString());
  } catch (error) {
    console.log('File corrupted! Use default game config.');
  }

  return currentRules;
}

export function loadGame(fileName: string): number[][] {
  let currentWorld;
  try {
    const data = fs.readFileSync(fileName, 'utf-8');
    currentWorld = JSON.parse(data.toString());
  } catch (error) {
    console.log('File corrupted! Make a new game!');
    console.log(error);
  }

  return currentWorld;
}

export function saveGame(fileName: string, currentWorld: number[][]) {
  const data = JSON.stringify(currentWorld);
  try {
    fs.writeFileSync(fileName, data);
    console.log('File sucsesfuly save!');
  } catch (error) {
    console.log('Save failed! Please try again');
    console.log(error);
  }
}
