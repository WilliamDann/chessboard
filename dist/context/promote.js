import { gameAt } from "./PositionPath";
import cloneTree from "./cloneTree";
import replaceGame from "./replaceGame";
// move a variation (and its continuation) into the mainline
export default function promote(state, action) {
    if (action.path.length <= 1)
        return state;
    const game = gameAt(state.games, action.path);
    const parentPath = action.path.slice(0, -1);
    const index = action.path[action.path.length - 1];
    if (!Number.isInteger(index) || index <= 0)
        return state;
    const moves = cloneTree(game.moves);
    let children = moves.children;
    for (const step of parentPath.slice(1)) {
        const parent = children[step];
        if (!parent)
            return state;
        children = parent.children;
    }
    if (!children[index])
        return state;
    const [promoted] = children.splice(index, 1);
    children.unshift(promoted);
    let selected = state.selected;
    if (selected.length > parentPath.length &&
        parentPath.every((step, depth) => selected[depth] === step)) {
        selected = [...selected];
        const depth = parentPath.length;
        const oldIndex = selected[depth];
        selected[depth] = oldIndex === index ? 0
            : oldIndex < index ? oldIndex + 1
                : oldIndex;
    }
    return replaceGame(state, action.path[0], { ...game, moves }, selected);
}
//# sourceMappingURL=promote.js.map