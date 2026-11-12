import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { X } from 'lucide-react';
import "./editor-row.css";
export default function EditorRow({ editors, panelPlacement = "below" }) {
    const [active, setActive] = useState(null);
    const handleButtonClick = (idx) => {
        if (idx === active)
            setActive(null);
        else
            setActive(idx);
    };
    return (_jsxs("div", { className: panelPlacement === "above" ? "editor-row panel-above" : "editor-row", children: [_jsx("div", { className: "editor-row-icons", children: editors.map((item, idx) => (_jsxs("button", { className: active === idx ? "selected" : "", type: "button", "aria-label": item.label, "aria-pressed": active === idx, onClick: () => handleButtonClick(idx), children: [_jsx("div", { children: item.icon }), _jsx("p", { children: item.label })] }, idx))) }), active !== null && (_jsxs("div", { className: "editor-row-panel", children: [_jsx("p", { className: "close", onClick: () => setActive(null), children: _jsx(X, {}) }), editors[active].editor] }))] }));
}
//# sourceMappingURL=EditorRow.js.map