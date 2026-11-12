import type { Game, PgnNodeData } from "chessops/pgn";
/** Game index followed by child indices within that game's move tree. */
export type PositionPath = number[];
export declare function gameAt(games: Game<PgnNodeData>[], path: PositionPath): Game<PgnNodeData>;
/** lookup a position/move by it's path */
export declare function lookup(games: Game<PgnNodeData>[], path: PositionPath): {
    game: Game<PgnNodeData>;
    position: import("chessops").Position;
    node: import("chessops/pgn").Node<PgnNodeData>;
};
//# sourceMappingURL=PositionPath.d.ts.map