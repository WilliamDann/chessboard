import { transform, Box } from "chessops/pgn";
export default function cloneTree(node) {
    return transform(node, new Box(null), (_, data) => ({ ...data }));
}
//# sourceMappingURL=cloneTree.js.map