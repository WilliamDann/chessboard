import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useChessActions, useChessState } from "../context";
import { lookup } from "../context/PositionPath";
import "./variation.css";
export default function VariationEditor() {
    const state = useChessState();
    const actions = useChessActions();
    const { node, position } = lookup(state.games, state.selected);
    // A selected move can be anywhere in a variation's continuation.
    const branchDepth = state.selected.reduce((last, index, depth) => depth > 0 && index > 0 ? depth : last, -1);
    const variationPath = state.selected.slice(0, branchDepth + 1);
    const canMoveDown = branchDepth !== -1 &&
        variationPath[branchDepth] + 1 < lookup(state.games, variationPath.slice(0, -1)).node.children.length;
    return (_jsxs("section", { className: "variation-editor", "aria-label": "Variation controls", children: [_jsx("h2", { children: "Variations" }), _jsxs("div", { className: "variation-editor-actions", children: [_jsx("button", { type: "button", disabled: branchDepth === -1, onClick: () => actions.promoteVariation(variationPath), children: "Promote variation" }), _jsx("button", { type: "button", disabled: branchDepth === -1, onClick: () => actions.moveVariationUp(variationPath), children: "Move variation up" }), _jsx("button", { type: "button", disabled: !canMoveDown, onClick: () => actions.moveVariationDown(variationPath), children: "Move variation down" }), _jsx("button", { type: "button", disabled: branchDepth === -1, onClick: () => actions.deleteVariation(variationPath), children: "Delete variation" }), _jsx("button", { type: "button", disabled: state.selected.length <= 1, onClick: () => actions.trimBefore(state.selected), children: "Trim before" }), _jsx("button", { type: "button", disabled: node.children.length === 0, onClick: () => actions.trimAfter(state.selected), children: "Trim after" }), _jsx("button", { type: "button", onClick: () => actions.addPosition(position), children: "Fork" })] })] }));
}
//# sourceMappingURL=VariationEditor.js.map