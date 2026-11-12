import type { Game, PgnNodeData } from "chessops/pgn";
import type { ChessState } from "./ChessReducer";

export default function replaceGame(state: ChessState, index: number, game: Game<PgnNodeData>, selected = state.selected): ChessState {
  const games = [...state.games];
  games[index] = game;
  return { games, selected };
}
