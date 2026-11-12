import type { ChildNode, PgnNodeData } from "chessops/pgn";
import type { PositionPath } from "./PositionPath";
import type { Position } from "chessops";
type Props = {
    node: ChildNode<PgnNodeData>;
    path: PositionPath;
    position: Position;
    onSelected: (selection: PositionPath) => void;
};
export default function MoveTreeNode({ node, path, position, onSelected }: Props): import("react").JSX.Element;
export {};
//# sourceMappingURL=MoveTreeNode.d.ts.map