import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useChessState } from "../context";
import { lookup } from "../context/PositionPath";
import { isChildNode } from "chessops/pgn";
import { getCommentText } from "../context/commentShapes";
import { NAGs } from "../NAG";
import "./move.css";
function NAG({ symbol }) {
    const nag = NAGs[symbol];
    return (_jsx("span", { className: nag.className, title: nag.description, children: nag.symbol }));
}
export default function Move({ path, variation = false, onSelected }) {
    const state = useChessState();
    const { position, node } = lookup(state.games, path);
    if (!isChildNode(node))
        throw new Error("Move requires a non-empty position path");
    const turn = position.turn == "white" ? "black" : "white";
    const num = position.fullmoves;
    const dots = turn == "white" ? '. ' : '... ';
    const prefix = num + dots;
    const selected = path.length == state.selected.length &&
        path.every((i, idx) => state.selected[idx] === i);
    return (_jsxs("span", { onClick: onSelected, children: [_jsxs("span", { className: 'move ' + (selected ? 'selected' : ''), children: [(turn == "white" || variation) ? prefix : " ", node.data.san, node.data.nags?.map((num, idx) => _jsx(NAG, { symbol: num }, idx))] }), " ", _jsx("span", { className: "comment", children: getCommentText(node.data.comments) }), " "] }));
}
//# sourceMappingURL=Move.js.map