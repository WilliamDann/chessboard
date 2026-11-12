import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { makeFen } from "chessops/fen";
import { makePgn, parsePgn, startingPosition, walk } from "chessops/pgn";
import { parseSan } from "chessops/san";
import { useState } from "react";
import { useChessDispatch, useChessState } from "../context";
import { lookup } from "../context/PositionPath";
import "./pgn.css";
export default function PgnEditor() {
    const state = useChessState();
    const dispatch = useChessDispatch();
    // A null draft follows the live game; typing preserves the draft until it is applied.
    const [draft, setDraft] = useState(null);
    const [error, setError] = useState(null);
    const pgn = makePgn(state.game);
    const fen = makeFen(lookup(state.game, state.selected).position.toSetup());
    const applyPgn = (event) => {
        event.preventDefault();
        const games = parsePgn(draft ?? pgn);
        if (games.length !== 1) {
            setError("Enter PGN for exactly one game.");
            return;
        }
        const game = games[0];
        const start = startingPosition(game.headers);
        if (start.isErr) {
            setError("Invalid starting position (FEN or variant).");
            return;
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
            setError(`Invalid move: ${invalidMove}.`);
            return;
        }
        dispatch({ type: "loadPgn", game });
        setDraft(null);
        setError(null);
    };
    return (_jsxs("form", { className: "chess-pgn-editor", onSubmit: applyPgn, children: [_jsx("h2", { children: "Import/Export" }), _jsx("label", { htmlFor: "chess-pgn", children: "PGN text" }), _jsx("textarea", { id: "chess-pgn", value: draft ?? pgn, onChange: (event) => {
                    setDraft(event.target.value);
                    setError(null);
                }, rows: 8, spellCheck: false }), _jsx("label", { htmlFor: "chess-fen", children: "Current Position FEN" }), _jsx("input", { id: "chess-fen", type: "text", value: fen, readOnly: true }), error && _jsx("p", { role: "alert", children: error }), _jsx("div", { className: "chess-pgn-actions", children: _jsx("button", { type: "submit", children: "Load" }) })] }));
}
//# sourceMappingURL=PgnEditor.js.map