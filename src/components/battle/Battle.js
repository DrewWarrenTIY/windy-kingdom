import React, { useEffect, useState } from "react";
import "./Battle.css";

import { LEVELS } from "../../constants/levels";

import {
  getUnitNames,
  checkIsAdjacent,
  endTurn,
  findOpenMelee,
  findOpenRandom,
} from "../../utils/battle";

export const Battle = (props) => {
  const styles = getStyles();
  const [currentLevel, setCurrentLevel] = useState(LEVELS().levelOne);
  const [gridSize, setGridSize] = useState([
    currentLevel.rows,
    currentLevel.columns,
  ]);
  const [players, setPlayers] = useState(currentLevel.players);
  const [enemies, setEnemies] = useState(currentLevel.enemies);
  const [isAttacking, setIsAttacking] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [turnOrder, setTurnOrder] = useState(
    getUnitNames([...currentLevel.players, ...currentLevel.enemies])
  );
  const [currentTurn, setCurrentTurn] = useState(0);
  const [status, setStatus] = useState("Time to fight!");
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);

  useEffect(() => {
    setTurnOrder(
      getUnitNames([...currentLevel.players, ...currentLevel.enemies])
    );
    setCurrentTurn(0);
  }, [currentLevel]);

  const handleReset = () => {
    setPlayers(currentLevel.players);
    setEnemies(currentLevel.enemies);
    setTurnOrder(
      getUnitNames([...currentLevel.players, ...currentLevel.enemies])
    );
    setCurrentTurn(0);
    setIsAttacking(false);
    setIsMoving(false);
    setStatus("Time to fight!");
    setHasWon(false);
    setHasLost(false);
  };

  const handleNextLevel = (currentLevel) => {
    const nextLevel =
      currentLevel.id === 2 ? LEVELS().levelThree : LEVELS().levelTwo;
    setCurrentLevel(nextLevel);
    setGridSize([nextLevel.rows, nextLevel.columns]);
    setPlayers(nextLevel.players);
    setEnemies(nextLevel.enemies);
    setStatus("Time to fight!");
    setHasWon(false);
    setHasLost(false);
  };

  const isPlayersTurn = getUnitNames(players).includes(turnOrder[currentTurn]);

  useEffect(() => {
    const executeMove = (unit) => {
      if (unit.move.pattern === "findOpenMelee") {
        return findOpenMelee(
          unit,
          players[0],
          players,
          enemies,
          gridSize[0],
          gridSize[1]
        );
      }

      if (unit.move.pattern === "random") {
        return findOpenRandom([...players, ...enemies], gridSize);
      }

      return unit.coords;
    };

    const executeAction = (unit) => {
      if (unit?.action?.pattern === "attack") {
        if (players[0].health === 1) {
          setHasLost(true);
          return setPlayers([
            {
              ...players[0],
              coords: [-1, -1],
              health: players[0].health - 1,
            },
          ]);
        }
        return setPlayers([{ ...players[0], health: players[0].health - 1 }]);
      }
      return null;
    };

    if (hasLost) {
      return setStatus("You Lost!");
    }

    // TODO: Allow action and move to happen separately without re-triggering effect

    if (!isPlayersTurn) {
      const actingEnemy = enemies.filter(
        (e) => turnOrder[currentTurn] === e.name
      )[0];
      setTimeout(() => {
        if (hasWon) {
          return setStatus("You Won!");
        }
        return setStatus(actingEnemy.move.status);
      }, 750);

      setTimeout(() => {
        if (hasWon) {
          return null;
        }
        return setStatus(actingEnemy?.action?.status);
      }, 2000);

      setTimeout(() => {
        if (hasWon) {
          setStatus("You Won!");
        }

        setEnemies(
          enemies.map((e) =>
            turnOrder[currentTurn] === e.name
              ? {
                  ...e,
                  coords: executeMove(e),
                }
              : e
          )
        );

        executeAction(actingEnemy);

        setCurrentTurn(endTurn(turnOrder, currentTurn));
      }, 3000);
    } else {
      if (!hasWon) {
        setStatus("Time to fight!");
      }
    }
  }, [
    hasWon,
    enemies,
    players,
    turnOrder,
    currentTurn,
    isPlayersTurn,
    gridSize,
    hasLost,
  ]);

  const hitEnemy = (enemy) => {
    let lastEnemyAlive = false;
    let hasMoreEnemies = false;

    setIsAttacking(false);

    if (enemy.invulnerable?.status) {
      setStatus(`Your attack does not affect ${enemy.name}!`);
      return setCurrentTurn(endTurn(turnOrder, currentTurn));
    }

    if (enemy.health > 1) {
      setStatus(`You hit ${enemy.name}!`);
      setEnemies(
        enemies.map((e) => {
          if (enemy.name !== e.name) {
            return e;
          }
          return { ...e, health: enemy.health - 1 };
        })
      );
      return setCurrentTurn(endTurn(turnOrder, currentTurn));
    }

    const newEnemies = enemies.filter((e) => enemy.name !== e.name);

    if (newEnemies.length === 1) lastEnemyAlive = true;
    if (newEnemies.length > 0) hasMoreEnemies = true;

    if (
      lastEnemyAlive &&
      newEnemies[0].invulnerable?.pattern === "lastEnemyAlive"
    ) {
      setEnemies([
        {
          ...newEnemies[0],
          invulnerable: { pattern: "lastEnemyAlive", status: false },
        },
      ]);
    } else {
      setEnemies(newEnemies);
    }
    setStatus(`You killed ${enemy.name}!`);

    if (hasMoreEnemies) {
      setTurnOrder(turnOrder.filter((name) => name !== enemy.name));
      return setCurrentTurn(
        endTurn(
          turnOrder.filter((name) => name !== enemy.name),
          currentTurn
        )
      );
    }
    setHasWon(true);
    return setCurrentTurn(-1);
  };

  const placePlayer = (x, y) => {
    return x === players[0].coords[0] && y === players[0].coords[1] ? (
      <div style={styles.player}>{`${players[0].name.charAt(0)}`}</div>
    ) : null;
  };

  const checkForEnemy = (x, y) => {
    let enemy = null;
    for (let i = 0; i < enemies.length; i++) {
      if (x === enemies[i].coords[0] && y === enemies[i].coords[1]) {
        enemy = enemies[i];
      }
    }
    return enemy;
  };

  const placeEnemy = (x, y) => {
    let enemy = checkForEnemy(x, y);
    return enemy ? (
      <div style={{ ...styles.enemy, ...enemy.styles }}>
        {enemy.name.charAt(0)}
      </div>
    ) : null;
  };

  const cells = (x, y) => {
    let cells = [];

    for (let i = 0; i < x; i++) {
      const isAdjacent = checkIsAdjacent(i, y, players[0].coords);
      let cellBackgroundStyles = "cell";
      if (isMoving) cellBackgroundStyles = "cell moveable";
      if (isAttacking && isAdjacent) cellBackgroundStyles = "cell targetable";

      const background = cellBackgroundStyles;
      const handleCellClick = (x, y, isAdjacent) => {
        if (!isAttacking && checkForEnemy(x, y))
          return setStatus("That is an enemy!");
        if (isMoving) {
          setStatus("Time to Fight!");
          setIsMoving(false);
          return setPlayers([{ ...players[0], coords: [x, y] }]);
        }
        if (isAttacking && !isAdjacent) return setStatus("You cannot reach.");
        if (isAttacking && isAdjacent) {
          if (checkForEnemy(x, y)) return hitEnemy(checkForEnemy(x, y));
          return setStatus("Swing and a miss!");
        }
      };

      cells.push(
        <div
          className={background}
          onClick={() => handleCellClick(i, y, isAdjacent)}
          key={`${i}, ${y}`}
          style={styles.battleGridCell}
        >
          <div style={styles.playerContainer}>
            {placePlayer(i, y)}
            {placeEnemy(i, y)}
          </div>
          <span style={styles.coords}>{`${i}, ${y}`}</span>
        </div>
      );
    }

    return cells;
  };

  const rows = (x, y) => {
    let rows = [];

    while (rows.length < y) {
      rows.push(
        <div key={`row-${rows.length}`} style={styles.battleGridRow}>
          {cells(x, rows.length)}
        </div>
      );
    }

    return rows;
  };

  const grid = (x, y) => <div style={styles.battleGrid}>{rows(x, y)}</div>;

  const enemyHealthDisplay = () => (
    <div>
      <h3>Enemy Health:</h3>
      {enemies.map((enemy) => (
        <div key={enemy.name}>{`${enemy.name}: ${enemy.health}`}</div>
      ))}
    </div>
  );

  const playerHealthDisplay = () => (
    <div>
      <h3>Player Health:</h3>
      {players.map((player) => (
        <div key={player.name}>{`${player.name}: ${player.health}`}</div>
      ))}
    </div>
  );

  return (
    <div>
      <h1>{`${currentLevel.mapName}`}</h1>
      <button onClick={() => props.handleNav("worldMap")}>Back</button>

      {grid(gridSize[0], gridSize[1])}

      {!hasWon && isMoving && (
        <button
          onClick={() => {
            setStatus("Time to Fight!");
            setIsMoving(false);
          }}
        >
          Cancel
        </button>
      )}
      {!hasWon && !isAttacking && !isMoving && (
        <button
          disabled={!isPlayersTurn || hasLost}
          onClick={() => {
            setStatus("Make your move.");
            setIsMoving(true);
          }}
        >
          Move
        </button>
      )}

      {!hasWon && isAttacking && (
        <button
          onClick={() => {
            setStatus("Time to Fight!");
            setIsAttacking(false);
          }}
        >
          Cancel
        </button>
      )}
      {!hasWon && !isAttacking && !isMoving && (
        <button
          disabled={!isPlayersTurn || hasLost}
          onClick={() => {
            setStatus("Take a swing.");
            setIsAttacking(true);
          }}
        >
          Attack
        </button>
      )}

      <h2>{status}</h2>
      {enemyHealthDisplay()}
      {playerHealthDisplay()}
      {isPlayersTurn ? (
        <>
          <button disabled={!isPlayersTurn} onClick={() => handleReset()}>
            Reset
          </button>

          {hasWon && currentLevel.id !== 3 && (
            <button
              disabled={!isPlayersTurn}
              onClick={() => handleNextLevel(currentLevel)}
            >
              Next Level
            </button>
          )}
        </>
      ) : null}
    </div>
  );
};

const getStyles = () => {
  return {
    battleGrid: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    battleGridRow: {
      backgroundColor: "green",
      display: "flex",
    },
    battleGridCell: {
      height: 50,
      width: 50,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    playerContainer: {
      height: "80%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    player: {
      borderRadius: 50,
      backgroundColor: "peachpuff",
      width: 10,
      height: 10,
    },
    enemy: {
      borderRadius: 50,
      backgroundColor: "red",
      width: 10,
      height: 10,
    },
    coords: {
      fontSize: 12,
      alignSelf: "flex-end",
      userSelect: "none",
    },
  };
};
