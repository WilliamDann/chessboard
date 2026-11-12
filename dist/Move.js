import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NAGs } from "./NAG";
function NAG({ symbol }) {
    const nag = NAGs[symbol];
    return (_jsx("span", { className: nag.className, title: nag.description, children: nag.symbol }));
}
export default function Move({ pos, node, variation = false, onSelected }) {
    const num = pos.fullmoves;
    const dots = pos.turn == "white" ? '. ' : '... ';
    const prefix = num + dots;
    return (_jsxs("span", { onClick: onSelected, children: [_jsxs("span", { className: "move", children: [(pos.turn == "white" || variation) ? prefix : " ", node.data.san, node.data.nags?.map((num, idx) => _jsx(NAG, { symbol: num }, idx))] }), " ", _jsx("span", { className: "comment", children: node.data.comments?.join(" ") }), " "] }));
}
//# sourceMappingURL=Move.js.map