import type { ChessState, ChessStateAction } from './ChessReducer';
export type ChessHistoryState = {
    past: ChessState[];
    present: ChessState;
    future: ChessState[];
};
export type ChessHistoryAction = ChessStateAction | {
    type: 'undo';
} | {
    type: 'redo';
};
export declare function chessHistoryReducer(history: ChessHistoryState, action: ChessHistoryAction): ChessHistoryState;
//# sourceMappingURL=ChessHistory.d.ts.map