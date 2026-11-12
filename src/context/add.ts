import type { Move, Position } from "chessops";
import { ChildNode, defaultGame, setStartingPosition, type Game, type PgnNodeData } from "chessops/pgn";
import { makeSanAndPlay } from "chessops/san";

import type { ChessActionOf, ChessState } from "./ChessReducer";
import { lookup } from "./PositionPath";
import cloneTree from "./cloneTree";
import replaceGame from "./replaceGame";

function addMove(state: ChessState, move: Move): ChessState {
  const { game, position } = lookup(state.games, state.selected);
  if (!position.isLegal(move)) return state;

  const san = makeSanAndPlay(position, move);
  const moves = cloneTree(game.moves);
  const parent = state.selected.slice(1).reduce(
    (node, index) => node.children[index],
    moves,
  );

  let index = parent.children.findIndex(child => child.data.san === san);
  if (index === -1) {
    index = parent.children.length;
    parent.children.push(new ChildNode({ san }));
  }

  return replaceGame(state, state.selected[0], { ...game, moves }, [...state.selected, index]);
}

function addGame(state: ChessState, game: Game<PgnNodeData> = defaultGame<PgnNodeData>()): ChessState {
  return { games: [...state.games, game], selected: [state.games.length] };
}

function addPosition(state: ChessState, position: Position): ChessState {
  const game = defaultGame<PgnNodeData>();
  setStartingPosition(game.headers, position);
  if (game.headers.has("FEN"))
    game.headers.set("SetUp", "1");
  else
    game.headers.delete("SetUp");
  return addGame(state, game);
}

function addGames(state: ChessState, games: Game<PgnNodeData>[]): ChessState {
  if (games.length === 0) return state;
  return { games: [...state.games, ...games], selected: [state.games.length] };
}

export default function add(state: ChessState, action: ChessActionOf<"add">): ChessState {
  if (action.move !== undefined) return addMove(state, action.move);
  if (action.position !== undefined) return addPosition(state, action.position);
  if (action.game !== undefined) return addGame(state, action.game);
  if (action.games !== undefined) return addGames(state, action.games);
  return addGame(state);
}
