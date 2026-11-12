import type { Move, Position } from "chessops";
import type { Game, PgnNodeData } from "chessops/pgn";
import { useMemo } from "react";

import type { PositionPath } from "./PositionPath";
import { useChessDispatch } from "./ChessContext";

export function useChessActions() {
  const dispatch = useChessDispatch();
  return useMemo(() => {
    const reorderVariation = (path: PositionPath, toIndex: number) =>
      dispatch({ type: "reorder", path, toIndex });

    return {
      select: (path: PositionPath) =>
        dispatch({ type: "select", path }),

      addMove: (move: Move) =>
        dispatch({ type: "add", move }),

      addPosition: (position: Position) =>
        dispatch({ type: "add", position }),

      addGame: (game?: Game<PgnNodeData>) =>
        dispatch(game === undefined ? { type: "add" } : { type: "add", game }),

      addGames: (games: Game<PgnNodeData>[]) =>
        dispatch({ type: "add", games }),

      updateNode: (path: PositionPath, data: Partial<PgnNodeData>) =>
        dispatch({ type: "update", path, data }),

      deleteGame: (index: number) =>
        dispatch({ type: "delete", path: [index] }),

      deleteVariation: (path: PositionPath) =>
        dispatch({ type: "delete", path }),

      trimBefore: (path: PositionPath) =>
        dispatch({ type: "trim", path, side: "before" }),

      trimAfter: (path: PositionPath) =>
        dispatch({ type: "trim", path, side: "after" }),

      setHeader: (key: string, value: string | null) =>
        dispatch({ type: "header", key, value }),

      reorderVariation,
      promoteVariation: (path: PositionPath) =>
        reorderVariation(path, 0),

      moveVariationUp: (path: PositionPath) => {
        const index = path.at(-1);
        if (index !== undefined) reorderVariation(path, index - 1);
      },

      moveVariationDown: (path: PositionPath) => {
        const index = path.at(-1);
        if (index !== undefined) reorderVariation(path, index + 1);
      },
    };
  }, [dispatch]);
}
