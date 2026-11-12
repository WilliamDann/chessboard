import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { Chessground as ChessgroundApi } from '@lichess-org/chessground';
import "./styles.css";
import { Chess } from 'chessops/chess';
import { parseFen } from 'chessops/fen';
import { chessgroundDests } from 'chessops/compat';
/** React wrapper for chessground */
export default function Chessground({ fen, config, onMove }) {
    const api = useRef(null);
    const div = useRef(null);
    const refresh = () => {
        const pos = Chess.fromSetup(parseFen(fen).unwrap()).unwrap();
        const dests = chessgroundDests(pos);
        api.current?.set({
            ...config,
            fen: fen,
            turnColor: pos.turn,
            movable: {
                ...config.movable,
                dests: dests,
                color: pos.turn,
                events: { after: onMove }
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
    useEffect(refresh, [fen, config]);
    return (_jsx("div", { className: "chessboard", children: _jsx("div", { ref: div, className: "chessboard-ground" }) }));
}
//# sourceMappingURL=Chessground.js.map