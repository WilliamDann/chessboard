import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useChessDispatch, useChessState } from "./ChessContext";
import MoveTreeNode from "./MoveTreeNode";
import { startingPosition } from "chessops/pgn";
export default function MoveTree() {
    const state = useChessState();
    const dispatch = useChessDispatch();
    if (!state || !dispatch) {
        console.error("MoveTree must exist inside ChessContext");
        return _jsx(_Fragment, {});
    }
    return (_jsx("div", { className: "move-tree mainline", children: _jsx(MoveTreeNode, { node: state.game.moves.children[0], position: startingPosition(state.game.headers).unwrap(), onSelected: (selected) => dispatch({ type: "select", path: selected }), path: [0] }) }));
}
//# sourceMappingURL=MoveTree.js.map