import type { Game, PgnNodeData } from "chessops/pgn";
import type { PositionPath } from "./PositionPath";
import type { Move, Position } from "chessops"

import select from "./select"
import add from "./add";
import update from "./update";
import trim from './trim'
import header from "./header"
import reorder from "./reorder";
import _delete from "./delete"

export type ChessState = {
  games: Game<PgnNodeData>[];
  selected: PositionPath;
}

export type ChessStateAction =
  | { type: "select"; path: PositionPath }
  | ({ type: "add" } & (
    | { move: Move; position?: never; game?: never; games?: never }
    | { position: Position; move?: never; game?: never; games?: never }
    | { game: Game<PgnNodeData>; move?: never; position?: never; games?: never }
    | { games: Game<PgnNodeData>[]; move?: never; position?: never; game?: never }
    | { move?: never; position?: never; game?: never; games?: never }
  ))
  | { type: "update"; path: PositionPath; data: Partial<PgnNodeData> }
  | { type: "reorder"; path: PositionPath; toIndex: number }
  | { type: "delete"; path: PositionPath }
  | { type: "trim"; path: PositionPath; side: "before" | "after" }
  | { type: "header"; key: string; value: string | null }

export type ChessActionOf<T extends ChessStateAction["type"]> =
  Extract<ChessStateAction, { type: T }>;

// reducer for chessground game tree state
export default function chessReducer(state: ChessState, action: ChessStateAction): ChessState {
  switch (action.type) {
    case "select": return select(state, action);
    case "add": return add(state, action);
    case "update": return update(state, action);

    case "delete": return _delete(state, action);
    case "trim": return trim(state, action);
    case "reorder": return reorder(state, action);

    case "header": return header(state, action);
  }
}
