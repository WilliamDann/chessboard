import { startingPosition } from "chessops/pgn";
import { parseSan } from "chessops/san";
export function gameAt(games, path) {
    const index = path[0];
    const game = games[index];
    if (!Number.isInteger(index) || !game)
        throw new Error("invalid game path");
    return game;
}
/** lookup a position/move by it's path */
export function lookup(games, path) {
    const game = gameAt(games, path);
    const position = startingPosition(game.headers).unwrap();
    let node = game.moves;
    for (const idx of path.slice(1)) {
        const child = node.children[idx];
        if (!child)
            throw new Error("invalid position path");
        const move = parseSan(position, child.data.san);
        if (!move)
            throw new Error("Invalid SAN");
        position.play(move);
        node = child;
    }
    return { game, position, node };
}
//# sourceMappingURL=PositionPath.js.map