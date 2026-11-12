import type { ChessActionOf, ChessState } from "./ChessReducer";
import { gameAt } from "./PositionPath";
import replaceGame from "./replaceGame";

// set a PGN header, or remove it when the value is null
export default function header(state: ChessState, action: ChessActionOf<"header">): ChessState {
  const index = state.selected[0];
  const game = gameAt(state.games, state.selected);
  const headers = new Map(game.headers);
  if (action.value === null)
    headers.delete(action.key);
  else
    headers.set(action.key, action.value);

  return replaceGame(state, index, { ...game, headers });
}

