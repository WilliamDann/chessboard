import { useMemo } from "react";
import { useChessDispatch } from "./ChessContext";
export function useChessActions() {
    const dispatch = useChessDispatch();
    return useMemo(() => {
        const reorderVariation = (path, toIndex) => dispatch({ type: "reorder", path, toIndex });
        return {
            select: (path) => dispatch({ type: "select", path }),
            addMove: (move) => dispatch({ type: "add", move }),
            addPosition: (position) => dispatch({ type: "add", position }),
            addGame: (game) => dispatch(game === undefined ? { type: "add" } : { type: "add", game }),
            addGames: (games) => dispatch({ type: "add", games }),
            updateNode: (path, data) => dispatch({ type: "update", path, data }),
            deleteGame: (index) => dispatch({ type: "delete", path: [index] }),
            deleteVariation: (path) => dispatch({ type: "delete", path }),
            trimBefore: (path) => dispatch({ type: "trim", path, side: "before" }),
            trimAfter: (path) => dispatch({ type: "trim", path, side: "after" }),
            setHeader: (key, value) => dispatch({ type: "header", key, value }),
            reorderVariation,
            promoteVariation: (path) => reorderVariation(path, 0),
            moveVariationUp: (path) => {
                const index = path.at(-1);
                if (index !== undefined)
                    reorderVariation(path, index - 1);
            },
            moveVariationDown: (path) => {
                const index = path.at(-1);
                if (index !== undefined)
                    reorderVariation(path, index + 1);
            },
        };
    }, [dispatch]);
}
//# sourceMappingURL=useChessActions.js.map