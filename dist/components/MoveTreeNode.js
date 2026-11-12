import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { lookup } from "../context/PositionPath";
import { useChessState } from "../context";
import Move from "./Move";
export default function MoveTreeNode({ path, onSelected }) {
    return (_jsxs(_Fragment, { children: [_jsx(Move, { onSelected: () => onSelected(path), path: path, variation: true }), _jsx(MoveTreeContinuation, { path: path, onSelected: onSelected })] }));
}
function MoveTreeContinuation({ path, onSelected }) {
    const state = useChessState();
    const { node } = lookup(state.games, path);
    const mainline = node.children[0];
    if (!mainline)
        return null;
    const mainlinePath = [...path, 0];
    return (_jsxs(_Fragment, { children: [_jsx(Move, { onSelected: () => onSelected(mainlinePath), path: mainlinePath }), node.children.slice(1).map((_, idx) => (_jsx("div", { className: "variation", children: _jsx(MoveTreeNode, { onSelected: onSelected, path: [...path, idx + 1] }) }, idx))), _jsx(MoveTreeContinuation, { path: mainlinePath, onSelected: onSelected })] }));
}
//# sourceMappingURL=MoveTreeNode.js.map