import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { isChildNode } from "chessops/pgn";
import { useState } from "react";
import { useChessActions, useChessState } from "../context";
import { lookup } from "../context/PositionPath";
import { NAGs } from "../NAG";
import "./nag.css";
const commonGroups = [
    {
        label: "Move quality",
        annotations: [
            { code: 1, label: "Good move" },
            { code: 2, label: "Mistake" },
            { code: 3, label: "Brilliant move" },
            { code: 4, label: "Blunder" },
            { code: 5, label: "Interesting move" },
            { code: 6, label: "Dubious move" },
            { code: 7, label: "Only move" },
            { code: 22, label: "Zugzwang" },
        ],
    },
    {
        label: "Position",
        annotations: [
            { code: 10, label: "Equal position" },
            { code: 13, label: "Unclear position" },
            { code: 14, label: "White is slightly better" },
            { code: 15, label: "Black is slightly better" },
            { code: 16, label: "White is better" },
            { code: 17, label: "Black is better" },
            { code: 18, label: "White is winning" },
            { code: 19, label: "Black is winning" },
        ],
    },
    {
        label: "Ideas and themes",
        annotations: [
            { code: 146, label: "Novelty" },
            { code: 32, label: "Development" },
            { code: 36, label: "Initiative" },
            { code: 40, label: "Attack" },
            { code: 132, label: "Counterplay" },
            { code: 138, label: "Time trouble" },
            { code: 44, label: "With compensation" },
            { code: 140, label: "With the idea" },
        ],
    },
];
const commonLabels = new Map(commonGroups.flatMap(({ annotations }) => annotations.map(({ code, label }) => [code, label])));
const availableNags = Object.entries(NAGs).map(([code, nag]) => ({
    code: Number(code),
    ...nag,
    label: commonLabels.get(Number(code)),
}));
function NAGButton({ code, selected, onToggle, detailed = false, label }) {
    const nag = NAGs[code];
    const description = nag?.description ?? "Unknown annotation";
    return (_jsxs("button", { type: "button", className: "nag-editor-button", "aria-label": label ? `${label} ($${code}: ${description})` : `$${code}: ${description}`, "aria-pressed": selected, title: `$${code}: ${description}`, onClick: () => onToggle(code), children: [_jsx("span", { className: `nag-editor-symbol ${nag?.className ?? ""}`, children: nag?.symbol || `$${code}` }), nag?.symbol && !label && _jsxs("span", { className: "nag-editor-code", children: ["$", code] }), (detailed || label) && _jsx("span", { className: "nag-editor-description", children: label ?? description })] }));
}
export default function NAGEditor() {
    const state = useChessState();
    const actions = useChessActions();
    const [search, setSearch] = useState("");
    const { node } = lookup(state.games, state.selected);
    if (!isChildNode(node))
        return _jsx("h2", { children: "Annotations" });
    const selectedNags = node.data.nags ?? [];
    const query = search.trim().toLowerCase();
    const matches = query
        ? availableNags.filter(({ code, description, symbol, label }) => description.toLowerCase().includes(query) ||
            label?.toLowerCase().includes(query) ||
            (symbol && symbol.toLowerCase().includes(query)) ||
            (/^\$?\d+$/.test(query) && String(code).includes(query.replace(/^\$/, ""))))
        : [];
    const toggle = (code) => {
        actions.updateNode(state.selected, {
            nags: selectedNags.includes(code)
                ? selectedNags.filter((nag) => nag !== code)
                : [...selectedNags, code],
        });
    };
    return (_jsxs("section", { className: "nag-editor", "aria-label": "Move annotations", children: [_jsx("h2", { children: "Annotations" }), selectedNags.length > 0 && (_jsxs("div", { children: [_jsx("h3", { children: "Selected" }), _jsx("div", { className: "nag-editor-buttons", children: selectedNags.map((code) => (_jsx(NAGButton, { code: code, selected: true, onToggle: toggle, detailed: true }, code))) })] })), _jsx("div", { className: "nag-editor-groups", children: commonGroups.map(({ label, annotations }) => (_jsxs("div", { children: [_jsx("h3", { children: label }), _jsx("div", { className: "nag-editor-buttons", children: annotations.map(({ code, label }) => (_jsx(NAGButton, { code: code, label: label, selected: selectedNags.includes(code), onToggle: toggle }, code))) })] }, label))) }), _jsx("label", { htmlFor: "nag-search", children: "Search all annotations" }), _jsx("input", { id: "nag-search", type: "search", value: search, onChange: (event) => setSearch(event.target.value), placeholder: "Description, symbol, or $number" }), query && (_jsx("div", { className: "nag-editor-results", children: matches.length > 0 ? (matches.map(({ code }) => (_jsx(NAGButton, { code: code, selected: selectedNags.includes(code), onToggle: toggle, detailed: true }, code)))) : (_jsx("p", { children: "No annotations found." })) }))] }));
}
//# sourceMappingURL=NAGEditor.js.map