import { gameAt } from "./PositionPath";
import cloneTree from "./cloneTree";
import replaceGame from "./replaceGame";
import { setStartingPosition } from "chessops/pgn";
import { lookup } from "./PositionPath";
function trimAfter(state, action) {
    const game = gameAt(state.games, action.path);
    const moves = cloneTree(game.moves);
    let children = moves.children;
    for (const index of action.path.slice(1)) {
        const node = children[index];
        if (!node)
            return state;
        children = node.children;
    }
    if (children.length === 0)
        return state;
    children.splice(0);
    const selected = state.selected.length > action.path.length &&
        action.path.every((index, depth) => state.selected[depth] === index)
        ? action.path
        : state.selected;
    return replaceGame(state, action.path[0], { ...game, moves }, selected);
}
function trimBefore(state, action) {
    if (action.path.length <= 1)
        return state;
    const game = gameAt(state.games, action.path);
    const movePath = action.path.slice(1);
    const moves = cloneTree(game.moves);
    const parentPath = action.path.slice(0, -1);
    let children = moves.children;
    for (const index of parentPath.slice(1)) {
        const parent = children[index];
        if (!parent)
            return state;
        children = parent.children;
    }
    const node = children[movePath[movePath.length - 1]];
    if (!node)
        return state;
    const headers = new Map(game.headers);
    if (parentPath.length > 1) {
        setStartingPosition(headers, lookup(state.games, parentPath).position);
        if (headers.has("FEN"))
            headers.set("SetUp", "1");
        else
            headers.delete("SetUp");
    }
    moves.children = [node];
    const selected = state.selected[0] !== action.path[0] ? state.selected
        : state.selected.length >= action.path.length &&
            action.path.every((index, depth) => state.selected[depth] === index)
            ? [action.path[0], 0, ...state.selected.slice(action.path.length)]
            : [action.path[0], 0];
    return replaceGame(state, action.path[0], { ...game, headers, moves }, selected);
}
export default function trim(state, action) {
    if (action.side == "before")
        return trimBefore(state, action);
    return trimAfter(state, action);
}
//# sourceMappingURL=trim.js.map