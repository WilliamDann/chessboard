import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./styles.css";
import { nodePath } from "./PositionPath";
import Chessboard from "./Chessboard";
import MoveTree from "./MoveTree";
import { useChessDispatch, useChessState } from "./ChessContext";
export default function Analysis() {
    const state = useChessState();
    const dispatch = useChessDispatch();
    if (!state || !dispatch) {
        console.error("Analysis must exist inside ChessContext");
        return _jsx(_Fragment, {});
    }
    const onKeyDown = (event) => {
        event.preventDefault();
        if (event.key == "ArrowLeft" && state.selected.length > 0) {
            dispatch({
                type: "select",
                path: state.selected.slice(0, -1),
            });
        }
        if (event.key === "ArrowRight") {
            const node = nodePath(state.game.moves, state.selected);
            if (node.children[0]) {
                event.preventDefault();
                dispatch({
                    type: "select",
                    path: [...state.selected, 0],
                });
            }
        }
    };
    return (_jsxs("main", { className: "analysis-panel", tabIndex: 0, onKeyDown: onKeyDown, children: [_jsx(Chessboard, {}), _jsx(MoveTree, {})] }));
}
//# sourceMappingURL=Analysis.js.map