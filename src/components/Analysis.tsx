import { MessageCircle, Clipboard, Tags, GitBranch, ListChevronsDownUp } from "lucide-react";

import Chessboard from "./Chessboard";
import MoveTree from "./MoveTree";
import ArrowNavigation from "./ArrowNavigation";
import EditorRow from "./EditorRow";
import Tray from "./Tray";
import CommentEditor from "./CommentEditor";
import NAGEditor from "./NAGEditor";
import PgnEditor from "./ImportExport";
import HeaderEditor from "./HeaderEditor";
import VariationEditor from "./VariationEditor";
import GameSelector from "./GameSelector";
import SideToMove from "./SideToMove";

import "./analysis.css"

export default function Analysis() {
  return (
    <main>
      <ArrowNavigation className="analysis-panel">
        <div className="analysis-board">
          <Chessboard />
          <SideToMove />
        </div>
        <MoveTree />
      </ArrowNavigation>
      <Tray>
        <EditorRow panelPlacement="above" editors={[
          { label: "Games", icon: <ListChevronsDownUp />, editor: <GameSelector /> },
          { label: "Comment", icon: <MessageCircle />, editor: <CommentEditor /> },
          { label: "Annotation", icon: <span className="nag-editor-icon" aria-hidden="true">!?</span>, editor: <NAGEditor /> },
          { label: "Variations", icon: <GitBranch />, editor: <VariationEditor /> },
          { label: "Headers", icon: <Tags />, editor: <HeaderEditor /> },
          { label: "Import/Export", icon: <Clipboard />, editor: <PgnEditor /> }
        ]} />
      </Tray>
    </main>
  )
}
