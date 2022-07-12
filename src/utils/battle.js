export const endTurn = (turnOrder, currentTurn) => {
    return currentTurn === turnOrder.length - 1 ? 0 : currentTurn + 1
}

export const isMovableTile = (x, y, players, enemies, rows, columns) => {
    if ( x < 0 || x >= rows) return false
    if ( y < 0 || y >= columns) return false

    let isVacant = true

    for (let i = 0; i < players.length; i++) {
        if (players[i].coords[0] === x && players[i].coords[1] === y) {
            isVacant = false
        }
    }

    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].coords[0] === x && enemies[i].coords[1] === y) {
            isVacant = false
        }
    }

    return isVacant
}

export const findOpenMelee = (target, players, enemies, rows, columns) => {
    let x = target.coords[0]
    let y = target.coords[1]

    if (isMovableTile(x, y + 1, players, enemies, rows, columns)) {
        return [x, y + 1]
    }

    if (isMovableTile(x + 1, y, players, enemies, rows, columns)) {
        return [x + 1, y]
    }

    if (isMovableTile(x, y - 1, players, enemies, rows, columns)) {
        return [x, y - 1]
    }

    if (isMovableTile(x - 1, y, players, enemies, rows, columns)) {
        return [x - 1, y]
    }

    return null
}