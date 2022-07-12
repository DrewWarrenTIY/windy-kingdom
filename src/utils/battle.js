export const endTurn = (turnOrder, currentTurn) => {
    return currentTurn === turnOrder.length - 1 ? 0 : currentTurn + 1
}