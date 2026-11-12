import type { ChessState, ChessActionOf } from "./ChessReducer";
import { gameAt } from "./PositionPath"
import cloneTree from "./cloneTree";
import replaceGame from "./replaceGame";

// delete a game or a node from its move tree
export default function _delete(state: ChessState, action: ChessActionOf<"delete">): ChessState {
  if (action.path.length === 1) {
    const index = action.path[0];
    if (state.games.length <= 1 || !Number.isInteger(index) || index < 0 || index >= state.games.length)
      return state;

    const games = state.games.filter((_, gameIndex) => gameIndex !== index);
    const selected = state.selected[0] === index
      ? [Math.min(index, games.length - 1)]
      : state.selected[0] > index
        ? [state.selected[0] - 1, ...state.selected.slice(1)]
        : state.selected;
    return { games, selected };
  }
  if (action.path.length === 0) return state;

  const game = gameAt(state.games, action.path);
  const movePath = action.path.slice(1);
  const moves = cloneTree(game.moves)

  const parentPath = movePath.slice(0, -1);
  const deletedIndex = movePath[movePath.length - 1];

  let children = moves.children;
  for (const index of parentPath) {
    const parent = children[index];
    if (!parent) return state;
    children = parent.children;
  }

  if (deletedIndex < 0 || deletedIndex >= children.length) return state;
  children.splice(deletedIndex, 1);

  let selected = state.selected;
  const sameParent =
    selected[0] === action.path[0] &&
    selected.length >= action.path.length &&
    parentPath.every((index, depth) => selected[depth + 1] === index);

  if (sameParent) {
    const selectedIndex = selected[parentPath.length + 1];

    if (selectedIndex === deletedIndex) {
      selected = action.path.slice(0, -1);
    } else if (selectedIndex > deletedIndex) {
      selected = [...selected];
      selected[parentPath.length + 1]--;
    }
  }

  return replaceGame(state, action.path[0], { ...game, moves }, selected);
}
