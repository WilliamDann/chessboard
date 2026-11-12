import { gameAt } from "./PositionPath";
import cloneTree from "./cloneTree";
import replaceGame from "./replaceGame";
// Move a variation (and its continuation) to another position among its siblings.
export default function reorder(state, action) {
    if (action.path.length <= 1)
        return state;
    const game = gameAt(state.games, action.path);
    const parentPath = action.path.slice(0, -1);
    const fromIndex = action.path[action.path.length - 1];
    const { toIndex } = action;
    let siblings = game.moves.children;
    for (const step of parentPath.slice(1)) {
        const parent = siblings[step];
        if (!parent)
            return state;
        siblings = parent.children;
    }
    if (!Number.isInteger(fromIndex) || !Number.isInteger(toIndex) ||
        fromIndex < 0 || fromIndex >= siblings.length ||
        toIndex < 0 || toIndex >= siblings.length || fromIndex === toIndex)
        return state;
    const moves = cloneTree(game.moves);
    let children = moves.children;
    for (const step of parentPath.slice(1))
        children = children[step].children;
    const [variation] = children.splice(fromIndex, 1);
    children.splice(toIndex, 0, variation);
    let selected = state.selected;
    if (selected.length > parentPath.length &&
        parentPath.every((step, depth) => selected[depth] === step)) {
        const depth = parentPath.length;
        const selectedIndex = selected[depth];
        const nextIndex = selectedIndex === fromIndex ? toIndex
            : fromIndex < toIndex && selectedIndex > fromIndex && selectedIndex <= toIndex ? selectedIndex - 1
                : toIndex < fromIndex && selectedIndex >= toIndex && selectedIndex < fromIndex ? selectedIndex + 1
                    : selectedIndex;
        if (nextIndex !== selectedIndex) {
            selected = [...selected];
            selected[depth] = nextIndex;
        }
    }
    return replaceGame(state, action.path[0], { ...game, moves }, selected);
}
//# sourceMappingURL=reorder.js.map