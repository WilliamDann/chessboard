import type { Position } from "chessops";
import type { ChildNode, PgnNodeData } from "chessops/pgn";
type Props = {
    pos: Position;
    node: ChildNode<PgnNodeData>;
    variation?: boolean;
    onSelected?: () => void;
};
export default function Move({ pos, node, variation, onSelected }: Props): import("react").JSX.Element;
export {};
//# sourceMappingURL=Move.d.ts.map