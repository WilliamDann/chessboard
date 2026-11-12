import type { Dispatch, ReactNode } from 'react';
import type { ChessState, ChessStateAction } from './ChessReducer';
import type { PgnNodeData } from 'chessops/pgn';

import { defaultGame, parsePgn } from "chessops/pgn";
import { createContext, useContext, useReducer } from "react";
import chessReducer from './ChessReducer';

type Props = {
  pgn?: string
  children: ReactNode
}

const ChessStateContext = createContext<ChessState | null>(null);
const ChessDispatchContext = createContext<Dispatch<ChessStateAction> | null>(null);

export function useChessState(): ChessState {
  const context = useContext(ChessStateContext);
  if (!context)
    throw new Error("Component must be inside a ChessContext")
  return context
}
export function useChessDispatch(): Dispatch<ChessStateAction> {
  const context = useContext(ChessDispatchContext);
  if (!context)
    throw new Error("Component must be inside a ChessContext")
  return context
}

export function ChessContext({ pgn, children }: Props) {
  const [state, dispatch] = useReducer(
    chessReducer,
    pgn,
    (pgn): ChessState => {
      const games = pgn ? parsePgn(pgn) : [];
      return {
        games: games.length > 0 ? games : [defaultGame<PgnNodeData>()],
        selected: [0]
      };
    }
  )

  return (
    <ChessStateContext.Provider value={state}>
      <ChessDispatchContext.Provider value={dispatch}>
        {children}
      </ChessDispatchContext.Provider>
    </ChessStateContext.Provider>
  )
}
