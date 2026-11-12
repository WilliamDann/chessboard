import type { PositionPath } from '../context/PositionPath.ts'

import { useChessState } from "../context"
import { lookup } from "../context/PositionPath"
import { isChildNode } from "chessops/pgn"
import { getCommentText } from "../context/commentShapes"

import { NAGs } from "../NAG"

import "./move.css"

type Props = {
  path: PositionPath;
  variation?: boolean;
  onSelected?: () => void;
}

type NAGProps = {
  symbol: number
}

function NAG({ symbol }: NAGProps) {
  const nag = NAGs[symbol];

  return (
    <span className={nag.className} title={nag.description}>{nag.symbol}</span>
  )
}

export default function Move({ path, variation = false, onSelected }: Props) {
  const state = useChessState();
  const { position, node } = lookup(state.games, path);

  if (!isChildNode(node))
    throw new Error("Move requires a non-empty position path");

  const turn = position.turn == "white" ? "black" : "white";

  const num = position.fullmoves
  const dots = turn == "white" ? '. ' : '... ';
  const prefix = num + dots;

  const selected =
    path.length == state.selected.length &&
    path.every((i, idx) => state.selected[idx] === i)

  return (
    <span onClick={onSelected}>
      <span className={'move ' + (selected ? 'selected' : '')}>
        {(turn == "white" || variation) ? prefix : " "}
        {node.data.san}
        {node.data.nags?.map((num, idx) => <NAG symbol={num} key={idx} />)}
      </span>
      {" "}
      <span className="comment">
        {getCommentText(node.data.comments)}
      </span>
      {" "}
    </span>
  )
}
