import { startingPosition } from "chessops/pgn";
import { parseSan } from "chessops/san";
/** get a node by it's PositionPath */
export function nodePath(root, path) {
    let node = root;
    for (const idx of path) {
        const child = node.children[idx];
        if (!child)
            throw new Error("invalid node path");
        node = child;
    }
    return node;
}
/** get a position by it's PositionPath */
export function positionPath(game, path) {
    const position = startingPosition(game.headers).unwrap();
    let node = game.moves;
    for (const idx of path) {
        const child = node.children[idx];
        if (!child)
            throw new Error("invalid position path");
        const move = parseSan(position, child.data.san);
        if (!move)
            throw new Error("Invalid SAN");
        position.play(move);
        node = child;
    }
    return position;
}
//# sourceMappingURL=PositionPath.js.map