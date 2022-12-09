export const LEVELS = () => {
  const playerName = localStorage.getItem("currentPlayer");
  return {
    levelOne: {
      id: 1,
      mapName: "Easy Peasy",
      rows: 5,
      columns: 5,
      players: [
        {
          coords: [0, 0],
          health: 5,
          name: playerName,
        },
      ],
      enemies: [
        {
          coords: [4, 4],
          health: 3,
          name: "Ben",
          move: {
            pattern: "random",
            status: "Ben staggers around, drunk.",
          },
          action: {
            status: "Ben pees a little.",
          },
        },
      ],
    },
    levelTwo: {
      id: 2,
      mapName: "Winnable",
      rows: 6,
      columns: 6,
      players: [
        {
          coords: [1, 1],
          health: 5,
          name: playerName,
        },
      ],
      enemies: [
        {
          coords: [2, 4],
          health: 2,
          name: "Frank",
          move: {
            pattern: "random",
            status: "Frank runs for his life.",
          },
          action: {
            status: "Frank shakes in his boots.",
          },
        },
        {
          coords: [4, 2],
          health: 5,
          name: "Sally",
          move: {
            pattern: "findOpenMelee",
            status: "Sally eyes you hungrily.",
          },
          action: {
            pattern: "attack",
            status: "Sally bites you. Really hard.",
          },
        },
      ],
    },
    levelThree: {
      id: 3,
      mapName: "Boss Fight",
      rows: 5,
      columns: 5,
      players: [
        {
          coords: [2, 4],
          health: 9,
          name: playerName,
        },
      ],
      enemies: [
        {
          coords: [2, 0],
          health: 1,
          name: "Boss",
          move: {
            pattern: null,
            status: "The Boss stands and laughs.",
          },
          action: {
            pattern: "attack",
            status: "The Boss starts blasting.",
          },
          invulnerable: {
            pattern: "lastEnemyAlive",
            status: true,
          },
          styles: {
            backgroundColor: "purple",
            width: 20,
            height: 20,
          },
        },
        {
          coords: [1, 1],
          health: 2,
          name: "Henchman",
          move: {
            pattern: "findOpenMelee",
            status: "Henchman positions aggressively.",
          },
          action: {
            pattern: "attack",
            status: "Henchman kicks you in the groin.",
          },
        },
        {
          coords: [3, 1],
          health: 2,
          name: "Minion",
          move: {
            pattern: "findOpenMelee",
            status: "Minion bucks up.",
          },
          action: {
            pattern: "attack",
            status: "Minion punches you in the mouth.",
          },
        },
      ],
    },
  };
};
