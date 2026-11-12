import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import Chessground from "./Chessground";
import { AnalysisConfig } from "./Configs";
import { useChessDispatch, useChessState } from "./ChessContext";
import { positionPath } from "./PositionPath";
import { parseSquare } from "chessops";
import { makeFen } from "chessops/fen";
export default function Chessboard() {
    const state = useChessState();
    const dispatch = useChessDispatch();
    if (!state || !dispatch) {
        console.error("Chessboard must exist inside ChessContext");
        return _jsx(_Fragment, {});
    }
    const position = positionPath(state.game, state.selected);
    const fen = makeFen(position.toSetup());
    return (_jsx(Chessground, { fen: fen, config: AnalysisConfig, onMove: (origin, destination, _) => {
            dispatch({
                type: "play",
                move: {
                    from: parseSquare(origin),
                    to: parseSquare(destination)
                }
            });
        } }));
}
//# sourceMappingURL=Chessboard.js.map