import { gameAt } from "./PositionPath";
import cloneTree from "./cloneTree";
import replaceGame from "./replaceGame";
// handle an update of a node in state (comment, nag, etc)
export default function update(state, action) {
    if (action.path.length === 1) {
        if (action.data.comments === undefined)
            return state;
        const game = gameAt(state.games, action.path);
        return replaceGame(state, action.path[0], { ...game, comments: action.data.comments });
    }
    if (action.path.length < 1)
        return state;
    const game = gameAt(state.games, action.path);
    const movePath = action.path.slice(1);
    const moves = cloneTree(game.moves);
    let children = moves.children;
    for (const index of movePath.slice(0, -1)) {
        const parent = children[index];
        if (!parent)
            return state;
        children = parent.children;
    }
    const node = children[movePath[movePath.length - 1]];
    if (!node)
        return state;
    node.data = { ...node.data, ...action.data };
    return replaceGame(state, action.path[0], { ...game, moves });
}
//# sourceMappingURL=update.js.map