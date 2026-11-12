import { useChessActions, useChessState } from "../context";
import { lookup } from "../context/PositionPath";
import { isChildNode } from "chessops/pgn";
import { getCommentText, withCommentText } from "../context/commentShapes";

import "./comment.css"

export default function CommentEditor() {
  const state = useChessState();
  const actions = useChessActions();

  const { game, node } = lookup(state.games, state.selected);
  const comments = isChildNode(node) ? node.data.comments : game.comments;

  return (
    <>
      <h2>Comment</h2>
      <form
        className="comment-editor"
        onSubmit={(event) => {
          event.preventDefault();
          const comment = String(new FormData(event.currentTarget).get("comment") ?? "");
          actions.updateNode(state.selected, { comments: withCommentText(comments, comment) });
        }}
      >
        <label htmlFor="move-comment">Comment</label>
        <textarea
          id="move-comment"
          name="comment"
          key={state.selected.join(".")}
          defaultValue={getCommentText(comments)}
          rows={4}
        />
        <button type="submit">Update</button>
      </form>
    </>
  );
}
