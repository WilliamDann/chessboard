import { lookup, useChessState } from "../context"

import "./sidetomove.css"

export default function SideToMove() {
  const state = useChessState();
  const { position } = lookup(state.games, state.selected);

  return (
    <>
      {
        position.turn == "white" ?
          <div className="to-move white" /> :
          <div className="to-move black" />
      }
    </>
  )
}
