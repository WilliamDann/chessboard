import { ChildNode, Box, transform } from "chessops/pgn";
import { makeSan, parseSan } from "chessops/san";
import { positionPath, nodePath } from "./PositionPath";
// handle a change in selected move
function select(state, action) {
    return {
        ...state,
        selected: action.path
    };
}
// handle a changs in the move tree
function play(state, action) {
    const position = positionPath(state.game, state.selected);
    if (!position.isLegal(action.move))
        return state;
    const san = makeSan(position, action.move);
    const currentNode = nodePath(state.game.moves, state.selected);
    const existingIndex = currentNode.children.findIndex((child) => {
        const move = parseSan(position, child.data.san);
        return move !== undefined && makeSan(position, move) === san;
    });
    if (existingIndex !== -1) {
        return {
            ...state,
            selected: [...state.selected, existingIndex],
        };
    }
    const moves = transform(state.game.moves, new Box(null), (_context, data) => ({ ...data }));
    const parent = nodePath(moves, state.selected);
    const childIndex = parent.children.length;
    parent.children.push(new ChildNode({ san }));
    return {
        game: { ...state.game, moves },
        selected: [...state.selected, childIndex],
    };
}
// TODO
function update(state, action) {
    return state;
}
// TODO
function _delete(state, action) {
    return state;
}
// reducer for chessground game tree state
export default function chessReducer(state, action) {
    switch (action.type) {
        case "select": return select(state, action);
        case "play": return play(state, action);
        case "update": return update(state, action);
        case "delete": return _delete(state, action);
    }
}
//# sourceMappingURL=ChessReducer.js.map