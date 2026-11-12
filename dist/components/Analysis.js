import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import "./analysis.css";
export default function Analysis() {
    return (_jsxs("main", { children: [_jsxs(ArrowNavigation, { className: "analysis-panel", children: [_jsxs("div", { className: "analysis-board", children: [_jsx(Chessboard, {}), _jsx(SideToMove, {})] }), _jsx(MoveTree, {})] }), _jsx(Tray, { children: _jsx(EditorRow, { panelPlacement: "above", editors: [
                        { label: "Games", icon: _jsx(ListChevronsDownUp, {}), editor: _jsx(GameSelector, {}) },
                        { label: "Comment", icon: _jsx(MessageCircle, {}), editor: _jsx(CommentEditor, {}) },
                        { label: "Annotation", icon: _jsx("span", { className: "nag-editor-icon", "aria-hidden": "true", children: "!?" }), editor: _jsx(NAGEditor, {}) },
                        { label: "Variations", icon: _jsx(GitBranch, {}), editor: _jsx(VariationEditor, {}) },
                        { label: "Headers", icon: _jsx(Tags, {}), editor: _jsx(HeaderEditor, {}) },
                        { label: "Import/Export", icon: _jsx(Clipboard, {}), editor: _jsx(PgnEditor, {}) }
                    ] }) })] }));
}
//# sourceMappingURL=Analysis.js.map