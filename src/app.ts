// eslint-disable-next-line import/no-unresolved
import { exit } from 'process';
import * as lifeFiles from './life-files';
// eslint-disable-next-line import/no-unresolved
import { makeNewWorld, showWorld } from './life-logic';
// eslint-disable-next-line import/no-unresolved
import { playGame } from './life-logic';

export default function app(): void {
  let currentRules = lifeFiles.readWorldConfig('./world-rules.json');
  let mainWorld = Array.from(
    Array(currentRules.worldSize),
    () => new Array(currentRules.worldSize),
  );
  const menu = require('../node_modules/cli-menu');
  console.clear();
  menu({
    menu_items: [
      {
        key: 'c',
        name: 'Load and view config',
        action: () => {
          console.clear();
          currentRules = lifeFiles.readWorldConfig('./dist/world-rules.json');
          console.log(currentRules);
        },
      },
      {
        key: 'n',
        name: 'New world',
        action: () => {
          console.clear();
          mainWorld = makeNewWorld(currentRules);
          showWorld(mainWorld, 1);
        },
      },
      {
        key: 'p',
        name: 'Play Game',
        action: () => {
          console.clear();
          if (mainWorld[0][0] != 0) {
            console.log('Make new World!');
          } else {
            mainWorld = playGame(mainWorld, currentRules);
            showWorld(mainWorld, currentRules.steps);
          }
        },
      },
      {
        key: 'l',
        name: 'Load World',
        action: () => {
          console.clear();
          mainWorld = lifeFiles.loadGame('./dist/save-game.json');
          showWorld(mainWorld, 1);
        },
      },
      {
        key: 's',
        name: 'Save world',
        action: () => {
          console.clear();
          lifeFiles.saveGame('./save-game.json', mainWorld);
        },
      },
      {
        key: 'q',
        name: 'Quit',
        action: (back: any) => back(),
      },
    ],
  }).then(() => {
    console.log('Bye-bye, have a nace day!');
  });
}

app();
