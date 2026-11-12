import chessReducer from './ChessReducer';
export function chessHistoryReducer(history, action) {
    if (action.type === 'undo') {
        if (history.past.length === 0)
            return history;
        return {
            past: history.past.slice(0, -1),
            present: history.past[history.past.length - 1],
            future: [history.present, ...history.future],
        };
    }
    if (action.type === 'redo') {
        if (history.future.length === 0)
            return history;
        return {
            past: [...history.past, history.present],
            present: history.future[0],
            future: history.future.slice(1),
        };
    }
    const present = chessReducer(history.present, action);
    if (present === history.present)
        return history;
    // Navigation changes the current selection, but does not create an edit or discard redo.
    if (present.games === history.present.games)
        return { ...history, present };
    return { past: [...history.past, history.present], present, future: [] };
}
//# sourceMappingURL=ChessHistory.js.map