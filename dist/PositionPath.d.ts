import { type Game, type Node, type PgnNodeData } from "chessops/pgn";
export type PositionPath = number[];
/** get a node by it's PositionPath */
export declare function nodePath(root: Node<PgnNodeData>, path: PositionPath): Node<PgnNodeData>;
/** get a position by it's PositionPath */
export declare function positionPath(game: Game<PgnNodeData>, path: PositionPath): import("chessops").Position;
//# sourceMappingURL=PositionPath.d.ts.map