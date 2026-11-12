import { jsx as _jsx } from "react/jsx-runtime";
import { useChessState } from "../context/ChessContext";
import { useChessActions } from "../context/useChessActions";
import { lookup } from "../context/PositionPath";
export default function ArrowNavigation({ children, className }) {
    const state = useChessState();
    const actions = useChessActions();
    const onKeyDown = (event) => {
        if (event.key == "ArrowLeft" && state.selected.length > 1) {
            event.preventDefault();
            actions.select(state.selected.slice(0, -1));
        }
        if (event.key === "ArrowRight") {
            event.preventDefault();
            const { node } = lookup(state.games, state.selected);
            if (node.children[0]) {
                actions.select([...state.selected, 0]);
            }
        }
        if (event.key === "ArrowUp" && state.selected.length > 1) {
            event.preventDefault();
            let variationStart = state.selected.length - 1;
            while (variationStart > 1 && state.selected[variationStart] === 0) {
                variationStart--;
            }
            const path = state.selected.slice(0, Math.max(variationStart + 1, state.selected.length - 10));
            if (variationStart === state.selected.length - 1) {
                if (path[variationStart] > 0) {
                    path[variationStart]--;
                }
                else {
                    path.pop();
                }
            }
            actions.select(path);
        }
        if (event.key === "ArrowDown") {
            event.preventDefault();
            const { node } = lookup(state.games, state.selected);
            let path;
            if (state.selected.length > 1) {
                const parentPath = state.selected.slice(0, -1);
                const { node: parent } = lookup(state.games, parentPath);
                const nextSibling = state.selected[state.selected.length - 1] + 1;
                if (parent.children[nextSibling]) {
                    path = [...parentPath, nextSibling];
                }
            }
            if (!path && node.children[1]) {
                path = [...state.selected, 1];
            }
            if (!path) {
                path = [...state.selected];
                let current = node;
                while (current.children[0] && path.length - state.selected.length < 10) {
                    path.push(0);
                    current = current.children[0];
                }
            }
            actions.select(path);
        }
    };
    return (_jsx("div", { className: className, tabIndex: 0, onKeyDown: onKeyDown, children: children }));
}
//# sourceMappingURL=ArrowNavigation.js.map