import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { startingPosition, walk } from "chessops/pgn";
import { parseSan } from "chessops/san";
import { Check, Plus, Trash2 } from "lucide-react";
import { useId, useState } from "react";
import { useChessActions, useChessState } from "../context";
import "./header.css";
export default function HeaderEditor() {
    const { games, selected } = useChessState();
    const game = games[selected[0]];
    const actions = useChessActions();
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [error, setError] = useState(null);
    const inputId = useId();
    const updateHeader = (key, nextValue) => {
        const headers = new Map(game.headers);
        if (nextValue === null)
            headers.delete(key);
        else
            headers.set(key, nextValue);
        const start = startingPosition(headers);
        if (start.isErr) {
            setError("Invalid starting position (FEN or variant).");
            return false;
        }
        let invalidMove;
        walk(game.moves, start.value, (position, data) => {
            const move = parseSan(position, data.san);
            if (!move) {
                invalidMove = data.san;
                return false;
            }
            position.play(move);
        });
        if (invalidMove) {
            setError(`Invalid move with these headers: ${invalidMove}.`);
            return false;
        }
        actions.setHeader(key, nextValue);
        setError(null);
        return true;
    };
    return (_jsxs("section", { className: "chess-header-editor", children: [_jsx("h2", { children: "Headers" }), _jsxs("ul", { className: "chess-header-list", children: [[...game.headers].map(([key, currentValue], index) => (_jsx("li", { children: _jsxs("form", { onSubmit: (event) => {
                                event.preventDefault();
                                const nextValue = String(new FormData(event.currentTarget).get("value") ?? "");
                                updateHeader(key, nextValue);
                            }, children: [_jsx("label", { htmlFor: `${inputId}-${index}`, title: key, children: key }), _jsx("input", { id: `${inputId}-${index}`, name: "value", defaultValue: currentValue }, currentValue), _jsx("button", { type: "submit", "aria-label": `Update ${key}`, title: `Update ${key}`, children: _jsx(Check, { size: 16 }) }), _jsx("button", { type: "button", "aria-label": `Remove ${key}`, title: `Remove ${key}`, onClick: () => updateHeader(key, null), children: _jsx(Trash2, { size: 16 }) })] }) }, key))), _jsx("li", { className: "chess-header-add", children: _jsxs("form", { onSubmit: (event) => {
                                event.preventDefault();
                                const key = name.trim();
                                if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(key)) {
                                    setError("Enter a valid PGN header name (letters, numbers, or underscores).");
                                }
                                else if (game.headers.has(key)) {
                                    setError(`Header ${key} already exists.`);
                                }
                                else if (updateHeader(key, value)) {
                                    setName("");
                                    setValue("");
                                }
                            }, children: [_jsx("input", { "aria-label": "New header name", placeholder: "Name", value: name, onChange: (event) => setName(event.target.value), required: true }), _jsx("input", { "aria-label": "New header value", placeholder: "Value", value: value, onChange: (event) => setValue(event.target.value) }), _jsx("button", { type: "submit", "aria-label": "Add header", title: "Add header", children: _jsx(Plus, { size: 16 }) })] }) })] }), error && _jsx("p", { role: "alert", children: error })] }));
}
//# sourceMappingURL=HeaderEditor.js.map