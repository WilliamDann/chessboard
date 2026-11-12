import { useEffect, useRef } from 'react'

import type { Key, MoveMetadata } from '@lichess-org/chessground/types'
import type { Api } from '@lichess-org/chessground/api'
import type { Config } from '@lichess-org/chessground/config'
import type { DrawShape } from '@lichess-org/chessground/draw'
import { Chessground as ChessgroundApi } from '@lichess-org/chessground'
import { RotateCw } from 'lucide-react'

import { Chess } from 'chessops/chess'
import { parseFen } from 'chessops/fen'
import { chessgroundDests } from 'chessops/compat';

import "./board.css"

type Props = {
  fen: string
  config: Config
  shapes: DrawShape[]
  onShapesChange: (shapes: DrawShape[]) => void

  onMove: (origin: Key, destination: Key, metadata: MoveMetadata) => void
}

/** React wrapper for chessground */
export default function Chessground({ fen, config, shapes, onShapesChange, onMove }: Props) {
  const api = useRef<Api | null>(null);
  const div = useRef<HTMLDivElement>(null);
  const onMoveRef = useRef(onMove);
  const onShapesChangeRef = useRef(onShapesChange);
  onMoveRef.current = onMove;
  onShapesChangeRef.current = onShapesChange;

  const refresh = () => {
    const pos = Chess.fromSetup(parseFen(fen).unwrap()).unwrap()
    const dests = chessgroundDests(pos)

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
    })
  }

  const init = () => {
    if (!div.current) return console.error('no board element');

    const inst = ChessgroundApi(div.current, config);
    api.current = inst;

    return () => inst.destroy();
  }

  useEffect(init, []);
  useEffect(refresh, [fen, config, shapes]);

  return (
    <div className="chessboard">
      <div ref={div} className="chessboard-ground" />
      <button
        type="button"
        className="chessboard-flip"
        aria-label="Flip board"
        title="Flip board"
        onClick={() => api.current?.toggleOrientation()}
      >
        <RotateCw size={18} aria-hidden="true" />
      </button>
    </div>
  )
}
