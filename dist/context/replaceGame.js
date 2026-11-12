export default function replaceGame(state, index, game, selected = state.selected) {
    const games = [...state.games];
    games[index] = game;
    return { games, selected };
}
//# sourceMappingURL=replaceGame.js.map