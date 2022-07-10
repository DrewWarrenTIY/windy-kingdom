export const LEVELS = {
    levelOne: {
        rows: 5,
        columns: 5,
        playerStart: [0, 0],
        enemies:[
            {
                coords: [4, 4],
                health: 3,
                name: 'Ben'
            }
        ],
    },
    levelTwo: {
        rows: 10,
        columns: 7,
        playerStart: [1, 1],
        enemies:[
            {
                coords: [6, 6],
                health: 3,
                name: 'Frank'
            },
            {
                coords: [4, 2],
                health: 3,
                name: 'Sally'
            }
        ]
    }
}