import type { PositionPath } from "../context/PositionPath";

import { lookup } from "../context/PositionPath"
import { useChessState } from "../context";

import Move from "./Move";

type Props = {
  path: PositionPath;
  onSelected: (selection: PositionPath) => void;
}

export default function MoveTreeNode({ path, onSelected }: Props) {
  return (
    <>
      <Move
        onSelected={() => onSelected(path)}
        path={path}
        variation
      />
      <MoveTreeContinuation path={path} onSelected={onSelected} />
    </>
  )
}

function MoveTreeContinuation({ path, onSelected }: Props) {
  const state = useChessState()
  const { node } = lookup(state.games, path);

  const mainline = node.children[0]
  if (!mainline) return null

  const mainlinePath = [...path, 0]

  return (
    <>
      <Move
        onSelected={() => onSelected(mainlinePath)}
        path={mainlinePath}
      />
      {node.children.slice(1).map((_, idx) => (
        <div className="variation" key={idx}>
          <MoveTreeNode onSelected={onSelected} path={[...path, idx + 1]} />
        </div>
      ))}
      <MoveTreeContinuation path={mainlinePath} onSelected={onSelected} />
    </>
  )
}
