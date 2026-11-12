import { transform, Box, type Node, type PgnNodeData } from "chessops/pgn";

export default function cloneTree(node: Node<PgnNodeData>): Node<PgnNodeData> {
  return transform(
    node,
    new Box(null),
    (_, data) => ({ ...data }),
  );
}
