import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { parseSan } from "chessops/san";
import { makeFen } from "chessops/fen";
import Move from "./Move";
function positionAfter(position, san) {
    const pos = position.clone();
    const move = parseSan(pos, san);
    if (!move)
        throw new Error("invalid san " + san + " in " + makeFen(pos.toSetup()));
    pos.play(move);
    return pos;
}
export default function MoveTreeNode({ node, path, position, onSelected }) {
    const pos = positionAfter(position, node.data.san);
    return (_jsxs(_Fragment, { children: [_jsx(Move, { onSelected: () => onSelected(path), pos: position, node: node, variation: true }), _jsx(MoveTreeContinuation, { node: node, path: path, onSelected: onSelected, position: pos })] }));
}
function MoveTreeContinuation({ node, path, position, onSelected }) {
    const mainline = node.children[0];
    if (!mainline)
        return null;
    const mainlinePath = [...path, 0];
    const pos = positionAfter(position, mainline.data.san);
    return (_jsxs(_Fragment, { children: [_jsx(Move, { onSelected: () => onSelected(mainlinePath), pos: position, node: mainline }), node.children.slice(1).map((child, idx) => (_jsx("div", { className: "variation", children: _jsx(MoveTreeNode, { node: child, position: position, onSelected: onSelected, path: [...path, idx + 1] }) }, idx))), _jsx(MoveTreeContinuation, { node: mainline, position: pos, path: mainlinePath, onSelected: onSelected })] }));
}
//# sourceMappingURL=MoveTreeNode.js.map