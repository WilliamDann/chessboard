import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Redo2, Undo2 } from 'lucide-react';
import { useChessHistory } from '../context/ChessContext';
import './undo-stack.css';
export default function UndoStack() {
    const { canUndo, canRedo, undo, redo } = useChessHistory();
    return (_jsxs("div", { className: "chess-undo-stack", role: "group", "aria-label": "Edit history", children: [_jsxs("button", { type: "button", onClick: undo, disabled: !canUndo, "aria-label": "Undo", title: "Undo", children: [_jsx(Undo2, { size: 18, "aria-hidden": "true" }), " Undo"] }), _jsxs("button", { type: "button", onClick: redo, disabled: !canRedo, "aria-label": "Redo", title: "Redo", children: [_jsx(Redo2, { size: 18, "aria-hidden": "true" }), " Redo"] })] }));
}
//# sourceMappingURL=UndoStack.js.map