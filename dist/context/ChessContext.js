import { jsx as _jsx } from "react/jsx-runtime";
import { defaultGame, parsePgn } from "chessops/pgn";
import { createContext, useContext, useReducer } from "react";
import chessReducer from './ChessReducer';
const ChessStateContext = createContext(null);
const ChessDispatchContext = createContext(null);
export function useChessState() {
    const context = useContext(ChessStateContext);
    if (!context)
        throw new Error("Component must be inside a ChessContext");
    return context;
}
export function useChessDispatch() {
    const context = useContext(ChessDispatchContext);
    if (!context)
        throw new Error("Component must be inside a ChessContext");
    return context;
}
export function ChessContext({ pgn, children }) {
    const [state, dispatch] = useReducer(chessReducer, pgn, (pgn) => {
        const games = pgn ? parsePgn(pgn) : [];
        return {
            games: games.length > 0 ? games : [defaultGame()],
            selected: [0]
        };
    });
    return (_jsx(ChessStateContext.Provider, { value: state, children: _jsx(ChessDispatchContext.Provider, { value: dispatch, children: children }) }));
}
//# sourceMappingURL=ChessContext.js.map