import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useChessActions, useChessState } from "../context";
import { lookup } from "../context/PositionPath";
import { isChildNode } from "chessops/pgn";
import { getCommentText, withCommentText } from "../context/commentShapes";
import "./comment.css";
export default function CommentEditor() {
    const state = useChessState();
    const actions = useChessActions();
    const { game, node } = lookup(state.games, state.selected);
    const comments = isChildNode(node) ? node.data.comments : game.comments;
    return (_jsxs(_Fragment, { children: [_jsx("h2", { children: "Comment" }), _jsxs("form", { className: "comment-editor", onSubmit: (event) => {
                    event.preventDefault();
                    const comment = String(new FormData(event.currentTarget).get("comment") ?? "");
                    actions.updateNode(state.selected, { comments: withCommentText(comments, comment) });
                }, children: [_jsx("label", { htmlFor: "move-comment", children: "Comment" }), _jsx("textarea", { id: "move-comment", name: "comment", defaultValue: getCommentText(comments), rows: 4 }, state.selected.join(".")), _jsx("button", { type: "submit", children: "Update" })] })] }));
}
//# sourceMappingURL=CommentEditor.js.map