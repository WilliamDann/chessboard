import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus, Trash2 } from "lucide-react";
import { Chess } from "chessops/chess";
import { parseFen } from "chessops/fen";
import { useState } from "react";
import { useChessActions, useChessState } from "../context";
import "./game-selector.css";
export default function GameSelector() {
    const { games, selected } = useChessState();
    const actions = useChessActions();
    const [showPositionForm, setShowPositionForm] = useState(false);
    const [fen, setFen] = useState("");
    const [error, setError] = useState(null);
    const addPosition = (event) => {
        event.preventDefault();
        const setup = parseFen(fen.trim());
        const position = setup.isErr ? undefined : Chess.fromSetup(setup.value);
        if (!position || position.isErr) {
            setError("Enter a valid chess FEN.");
            return;
        }
        actions.addPosition(position.value);
        setFen("");
        setError(null);
        setShowPositionForm(false);
    };
    return (_jsxs("section", { className: "game-selector", "aria-label": "Games", children: [_jsx("h2", { children: "Games" }), _jsx("ul", { children: games.map((game, index) => {
                    const white = game.headers.get("White")?.trim();
                    const black = game.headers.get("Black")?.trim();
                    return (_jsxs("li", { children: [_jsxs("button", { type: "button", "aria-current": selected[0] === index ? "true" : undefined, onClick: () => actions.select([index]), children: ["Game ", index + 1, white || black ? `: ${white || "?"} vs ${black || "?"}` : ""] }), _jsxs("button", { className: "game-selector-remove", type: "button", "aria-label": `Remove game ${index + 1}`, title: games.length === 1 ? "At least one game is required" : `Remove game ${index + 1}`, disabled: games.length === 1, onClick: () => actions.deleteGame(index), children: [_jsx(Trash2, { size: 16 }), " Remove"] })] }, index));
                }) }), _jsxs("div", { className: "game-selector-actions", children: [_jsxs("button", { type: "button", onClick: () => actions.addGame(), children: [_jsx(Plus, { size: 16 }), " Add game"] }), _jsxs("button", { type: "button", "aria-expanded": showPositionForm, onClick: () => {
                            setShowPositionForm(!showPositionForm);
                            setError(null);
                        }, children: [_jsx(Plus, { size: 16 }), " Add Position"] })] }), showPositionForm && (_jsxs("form", { className: "game-selector-position-form", onSubmit: addPosition, children: [_jsxs("label", { children: ["FEN", _jsx("input", { type: "text", value: fen, onChange: (event) => {
                                    setFen(event.target.value);
                                    setError(null);
                                }, required: true, autoFocus: true })] }), error && _jsx("p", { role: "alert", children: error }), _jsx("button", { type: "submit", children: "Create position" })] }))] }));
}
//# sourceMappingURL=GameSelector.js.map