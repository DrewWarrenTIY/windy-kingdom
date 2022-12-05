export const getUnitNames = (units) => {
  return units.map((unit) => unit.name);
};

export const endTurn = (turnOrder, currentTurn) => {
  return currentTurn === turnOrder.length - 1 ? 0 : currentTurn + 1;
};

export const checkIsAdjacent = (x, y, coords) => {
  if (coords[0] - 1 === x && coords[1] === y) return true;
  if (coords[0] + 1 === x && coords[1] === y) return true;
  if (coords[0] === x && coords[1] - 1 === y) return true;
  if (coords[0] === x && coords[1] + 1 === y) return true;

  return false;
};

export const isMovableTile = (x, y, players, enemies, rows, columns) => {
  if (x < 0 || x >= rows) return false;
  if (y < 0 || y >= columns) return false;

  let isVacant = true;

  for (let i = 0; i < players.length; i++) {
    if (players[i].coords[0] === x && players[i].coords[1] === y) {
      isVacant = false;
    }
  }

  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].coords[0] === x && enemies[i].coords[1] === y) {
      isVacant = false;
    }
  }

  return isVacant;
};

export const findOpenRandom = (units, gridSize) => {
  console.log("units: ", units);
  let isCellTaken = false;
  const newCoords = [];
  newCoords.push(Math.floor(Math.random() * gridSize[0]));
  newCoords.push(Math.floor(Math.random() * gridSize[1]));
  for (let i = 0; i < units.length; i++) {
    if (
      newCoords[0] === units[i].coords[0] &&
      newCoords[1] === units[i].coords[1]
    ) {
      isCellTaken = true;
    }
  }
  return isCellTaken ? findOpenRandom(units, gridSize) : newCoords;
};

export const findOpenMelee = (
  mover,
  target,
  players,
  enemies,
  rows,
  columns
) => {
  if (checkIsAdjacent(mover.coords[0], mover.coords[1], players[0].coords)) {
    return mover.coords;
  }

  if (
    isMovableTile(
      target.coords[0],
      target.coords[1] - 1,
      players,
      enemies,
      rows,
      columns
    )
  ) {
    return [target.coords[0], target.coords[1] - 1];
  }

  if (
    isMovableTile(
      target.coords[0] + 1,
      target.coords[1],
      players,
      enemies,
      rows,
      columns
    )
  ) {
    return [target.coords[0] + 1, target.coords[1]];
  }

  if (
    isMovableTile(
      target.coords[0],
      target.coords[1] + 1,
      players,
      enemies,
      rows,
      columns
    )
  ) {
    return [target.coords[0], target.coords[1] + 1];
  }

  if (
    isMovableTile(
      target.coords[0] - 1,
      target.coords[1],
      players,
      enemies,
      rows,
      columns
    )
  ) {
    return [target.coords[0] - 1, target.coords[1]];
  }
};
