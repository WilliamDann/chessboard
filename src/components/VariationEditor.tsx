import { useChessActions, useChessState } from "../context";
import { lookup } from "../context/PositionPath";

import "./variation.css";

export default function VariationEditor() {
  const state = useChessState();
  const actions = useChessActions();
  const { node, position } = lookup(state.games, state.selected);

  // A selected move can be anywhere in a variation's continuation.
  const branchDepth = state.selected.reduce(
    (last, index, depth) => depth > 0 && index > 0 ? depth : last,
    -1,
  );
  const variationPath = state.selected.slice(0, branchDepth + 1);
  const canMoveDown = branchDepth !== -1 &&
    variationPath[branchDepth] + 1 < lookup(state.games, variationPath.slice(0, -1)).node.children.length;

  return (
    <section className="variation-editor" aria-label="Variation controls">
      <h2>Variations</h2>
      <div className="variation-editor-actions">
        <button
          type="button"
          disabled={branchDepth === -1}
          onClick={() => actions.promoteVariation(variationPath)}
        >
          Promote variation
        </button>
        <button
          type="button"
          disabled={branchDepth === -1}
          onClick={() => actions.moveVariationUp(variationPath)}
        >
          Move variation up
        </button>
        <button
          type="button"
          disabled={!canMoveDown}
          onClick={() => actions.moveVariationDown(variationPath)}
        >
          Move variation down
        </button>
        <button
          type="button"
          disabled={branchDepth === -1}
          onClick={() => actions.deleteVariation(variationPath)}
        >
          Delete variation
        </button>
        <button
          type="button"
          disabled={state.selected.length <= 1}
          onClick={() => actions.trimBefore(state.selected)}
        >
          Trim before
        </button>
        <button
          type="button"
          disabled={node.children.length === 0}
          onClick={() => actions.trimAfter(state.selected)}
        >
          Trim after
        </button>
        <button
          type="button"
          onClick={() => actions.addPosition(position)}
        >
          Fork
        </button>
      </div>
    </section>
  );
}
