import { jsx as _jsx } from "react/jsx-runtime";
import { parsePgn } from "chessops/pgn";
import { createContext, useContext, useReducer } from "react";
import chessReducer from './ChessReducer';
const ChessStateContext = createContext(null);
const ChessDispathContext = createContext(null);
export function useChessState() {
    return useContext(ChessStateContext);
}
export function useChessDispatch() {
    return useContext(ChessDispathContext);
}
export function ChessContext({ pgn, children }) {
    const [state, dispatch] = useReducer(chessReducer, pgn, (pgn) => ({
        game: parsePgn(pgn)[0],
        selected: []
    }));
    return (_jsx(ChessStateContext.Provider, { value: state, children: _jsx(ChessDispathContext.Provider, { value: dispatch, children: children }) }));
}
//# sourceMappingURL=ChessContext.js.map