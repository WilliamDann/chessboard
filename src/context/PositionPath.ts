import type { Game, PgnNodeData } from "chessops/pgn";

import { startingPosition } from "chessops/pgn";
import { parseSan } from "chessops/san";

/** Game index followed by child indices within that game's move tree. */
export type PositionPath = number[];

export function gameAt(games: Game<PgnNodeData>[], path: PositionPath): Game<PgnNodeData> {
  const index = path[0];
  const game = games[index];
  if (!Number.isInteger(index) || !game)
    throw new Error("invalid game path");
  return game;
}

/** lookup a position/move by it's path */
export function lookup(games: Game<PgnNodeData>[], path: PositionPath) {
  const game = gameAt(games, path);
  const position = startingPosition(game.headers).unwrap();
  let node = game.moves;

  for (const idx of path.slice(1)) {
    const child = node.children[idx];

    if (!child)
      throw new Error("invalid position path")

    const move = parseSan(position, child.data.san);
    if (!move)
      throw new Error("Invalid SAN")

    position.play(move)
    node = child
  }

  return { game, position, node }
}
