// eslint-disable-next-line import/no-unresolved 
import { WorldRules } from './types/types';

export function makeNewWorld(currentRules: WorldRules): number[][] {
  const currentWorld: number[][] = [];
  const smallSize = currentRules.worldSize - 1;
  //generate world border
  for (let i = 0; i < currentRules.worldSize; i++) {
    currentWorld[i][0] = 0;
    currentWorld[i][smallSize] = 0;
    for (let j = 0; j < currentRules.worldSize; j++) {
      currentWorld[0][j] = 0;
      currentWorld[smallSize][j] = 0;
    }
  }

  //generate world
  for (let i = 0; i < smallSize; i++) {
    for (let j = 0; j < smallSize; j++) {
      currentWorld[i][j] = Math.floor(Math.random() * 2);
    }
  }
  return currentWorld;
}

export function showWorld(currentWorld: number[][], localSize: number) {
  console.log(currentWorld);
  console.log(localSize);
}

export function cellDestiny(
  currentWorld: number[][],
  currentRules: WorldRules,
  i: number,
  j: number,
): number {
  let neighbors = 0;
  for (let k = i - 1; k <= i + 1; k++) {
    for (let m = j - 1; m <= j + 1; m++) {
      neighbors += currentWorld[k][m];
    }
  }
  if (neighbors === currentRules.birthCell) {
    return 1;
  }
  if (neighbors < currentRules.aloneCell) {
    return 0;
  }
  if (neighbors > currentRules.overpopulatedCell) {
    return 0;
  } else {
    return 1;
  }
}

export function nextStep(oldWorld: number[][], currentRules: WorldRules) {
  const tempArray: number[][] = [];

  for (let i = 0; i < currentRules.worldSize; i++) {
    for (let j = 0; j < currentRules.worldSize; j++) {
      tempArray[i][j] = cellDestiny(oldWorld, currentRules, i, j);
    }
  }
  return tempArray;
}
