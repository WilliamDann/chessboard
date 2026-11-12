import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { isChildNode } from "chessops/pgn";
import Chessground from "./Chessground";
import { AnalysisConfig } from "../Configs";
import { useChessState } from "../context/ChessContext";
import { useChessActions } from "../context/useChessActions";
import { lookup } from "../context/PositionPath";
import { getShapes, withShapes } from "../context/commentShapes";
import { parseSquare } from "chessops";
import { makeFen } from "chessops/fen";
import "./board.css";
export default function Chessboard() {
    const state = useChessState();
    const actions = useChessActions();
    const { game, node, position } = lookup(state.games, state.selected);
    const comments = isChildNode(node) ? node.data.comments : game.comments;
    const shapes = useMemo(() => getShapes(comments), [comments]);
    const fen = makeFen(position.toSetup());
    return (_jsx(Chessground, { fen: fen, config: AnalysisConfig, shapes: shapes, onShapesChange: (drawn) => actions.updateNode(state.selected, { comments: withShapes(comments, drawn) }), onMove: (origin, destination, _) => {
            actions.addMove({
                from: parseSquare(origin),
                to: parseSquare(destination)
            });
        } }));
}
//# sourceMappingURL=Chessboard.js.map