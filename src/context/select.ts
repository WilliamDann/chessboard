import type { ChessActionOf, ChessState } from "./ChessReducer";

export default function select(state: ChessState, action: ChessActionOf<"select">): ChessState {
  return {
    ...state,
    selected: action.path
  }
}
