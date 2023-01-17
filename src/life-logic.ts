// eslint-disable-next-line import/no-unresolved
import { WorldRules } from './types/types';

export function makeNewWorld(currentRules: WorldRules): number[][] {
  const currentWorld = Array.from(
    Array(currentRules.worldSize),
    () => new Array(currentRules.worldSize),
  );

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
  for (let i = 1; i < smallSize; i++) {
    for (let j = 1; j < smallSize; j++) {
      currentWorld[i][j] = Math.floor(Math.random() * 2);
    }
  }
  return currentWorld;
}

export function showWorld(currentWorld: number[][], currentStep: number) {
  console.log(`Step number: ${currentStep}`);
  console.table(currentWorld);
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
  const tempWorld = Array.from(
    Array(currentRules.worldSize),
    () => new Array(currentRules.worldSize),
  );
  //generate worl border
  for (let i = 0; i < currentRules.worldSize; i++) {
    tempWorld[i][0] = 0;
    tempWorld[i][currentRules.worldSize - 1] = 0;
    for (let j = 0; j < currentRules.worldSize; j++) {
      tempWorld[0][j] = 0;
      tempWorld[currentRules.worldSize - 1][j] = 0;
    }
  }

  for (let i = 1; i < currentRules.worldSize - 1; i++) {
    for (let j = 1; j < currentRules.worldSize - 1; j++) {
      tempWorld[i][j] = cellDestiny(oldWorld, currentRules, i, j);
    }
  }
  return tempWorld;
}

export function playGame(mainWorld: number[][], currentRules: WorldRules) {
  let currentWorld = Array.from(
    Array(currentRules.worldSize),
    () => new Array(currentRules.worldSize),
  );

  currentWorld = nextStep(mainWorld, currentRules);
  for (let i = 1; i < currentRules.steps; i++) {
    currentWorld = nextStep(mainWorld, currentRules);
  }
  return currentWorld;
}
