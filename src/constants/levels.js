const playerName = localStorage.getItem('currentPlayer')

export const LEVELS = {
    levelOne: {
        rows: 5,
        columns: 5,
        players:[
            {
                coords: [0, 0],
                health: 10,
                name: playerName
            }
        ],
        enemies:[
            {
                coords: [4, 4],
                health: 3,
                name: 'Ben'
            }
        ],
    },
    levelTwo: {
        rows: 6,
        columns: 6,
        players:[
            {
                coords: [1, 1],
                health: 10,
                name: playerName
            }
        ],
        enemies:[
            {
                coords: [5, 5],
                health: 1,
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