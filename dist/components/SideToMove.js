import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { lookup, useChessState } from "../context";
import "./sidetomove.css";
export default function SideToMove() {
    const state = useChessState();
    const { position } = lookup(state.games, state.selected);
    return (_jsx(_Fragment, { children: position.turn == "white" ?
            _jsx("div", { className: "to-move white" }) :
            _jsx("div", { className: "to-move black" }) }));
}
//# sourceMappingURL=SideToMove.js.map