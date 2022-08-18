export const getRandomOpenCoords = (obstacles, gridSize) => {
    let isCellTaken = false
    const newCoords = []
    newCoords.push(Math.floor(Math.random() * gridSize[0]))
    newCoords.push(Math.floor(Math.random() * gridSize[1]))
    for (let i = 0; i < obstacles.length; i++) {
        if (newCoords[0] === obstacles[i].coords[0] && newCoords[1] === obstacles[i].coords[1]) {
            isCellTaken = true
        }
    }

    return isCellTaken ? getRandomOpenCoords(obstacles, gridSize) : newCoords
}

export const getUnitNames = (units) => {
    return units.map((unit) => unit.name)
}