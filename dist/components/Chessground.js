import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { Chessground as ChessgroundApi } from '@lichess-org/chessground';
import { RotateCw } from 'lucide-react';
import { Chess } from 'chessops/chess';
import { parseFen } from 'chessops/fen';
import { chessgroundDests } from 'chessops/compat';
import "./board.css";
/** React wrapper for chessground */
export default function Chessground({ fen, config, shapes, onShapesChange, onMove }) {
    const api = useRef(null);
    const div = useRef(null);
    const onMoveRef = useRef(onMove);
    const onShapesChangeRef = useRef(onShapesChange);
    onMoveRef.current = onMove;
    onShapesChangeRef.current = onShapesChange;
    const refresh = () => {
        const pos = Chess.fromSetup(parseFen(fen).unwrap()).unwrap();
        const dests = chessgroundDests(pos);
        api.current?.set({
            ...config,
            fen: fen,
            turnColor: pos.turn,
            drawable: {
                ...config.drawable,
                shapes,
                onChange: drawn => onShapesChangeRef.current(drawn),
            },
            movable: {
                ...config.movable,
                dests: dests,
                color: pos.turn,
                events: { after: (origin, destination, metadata) => onMoveRef.current(origin, destination, metadata) }
            }
        });
    };
    const init = () => {
        if (!div.current)
            return console.error('no board element');
        const inst = ChessgroundApi(div.current, config);
        api.current = inst;
        return () => inst.destroy();
    };
    useEffect(init, []);
    useEffect(refresh, [fen, config, shapes]);
    return (_jsxs("div", { className: "chessboard", children: [_jsx("div", { ref: div, className: "chessboard-ground" }), _jsx("button", { type: "button", className: "chessboard-flip", "aria-label": "Flip board", title: "Flip board", onClick: () => api.current?.toggleOrientation(), children: _jsx(RotateCw, { size: 18, "aria-hidden": "true" }) })] }));
}
//# sourceMappingURL=Chessground.js.map