import { useChessState } from "../context/ChessContext"
import { useChessActions } from "../context/useChessActions"
import MoveTreeNode from "./MoveTreeNode"

import "./tree.css"

export default function MoveTree() {
  const actions = useChessActions();
  const { games, selected } = useChessState();
  const gameIndex = selected[0];
  const game = games[gameIndex];

  if (!game.moves.children[0]) return null;

  return (
    <div className="move-tree mainline">
      <MoveTreeNode
        onSelected={actions.select}
        path={[gameIndex, 0]}
      />
      {game.moves.children.slice(1).map((_, index) => (
        <div className="variation" key={index}>
          <MoveTreeNode
            onSelected={actions.select}
            path={[gameIndex, index + 1]}
          />
        </div>
      ))}
    </div>
  )
}
