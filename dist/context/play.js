import { makeSanAndPlay } from "chessops/san";
import { lookup } from "./PositionPath";
import cloneTree from "./cloneTree";
import { ChildNode } from "chessops/pgn";
import replaceGame from "./replaceGame";
export default function play(state, move) {
    const { game, position } = lookup(state.games, state.selected);
    if (!position.isLegal(move))
        return state;
    const san = makeSanAndPlay(position, move);
    const cpy = cloneTree(game.moves);
    const parent = state.selected.slice(1).reduce((node, index) => node.children[index], cpy);
    let idx = parent.children.findIndex(child => child.data.san === san);
    if (idx === -1) {
        idx = parent.children.length;
        parent.children.push(new ChildNode({ san }));
    }
    return replaceGame(state, state.selected[0], { ...game, moves: cpy }, [...state.selected, idx]);
}
//# sourceMappingURL=play.js.map