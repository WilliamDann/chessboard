import type { Move, Position } from "chessops";
import type { Game, PgnNodeData } from "chessops/pgn";
import type { PositionPath } from "./PositionPath";
export declare function useChessActions(): {
    select: (path: PositionPath) => void;
    addMove: (move: Move) => void;
    addPosition: (position: Position) => void;
    addGame: (game?: Game<PgnNodeData>) => void;
    addGames: (games: Game<PgnNodeData>[]) => void;
    updateNode: (path: PositionPath, data: Partial<PgnNodeData>) => void;
    deleteGame: (index: number) => void;
    deleteVariation: (path: PositionPath) => void;
    trimBefore: (path: PositionPath) => void;
    trimAfter: (path: PositionPath) => void;
    setHeader: (key: string, value: string | null) => void;
    reorderVariation: (path: PositionPath, toIndex: number) => void;
    promoteVariation: (path: PositionPath) => void;
    moveVariationUp: (path: PositionPath) => void;
    moveVariationDown: (path: PositionPath) => void;
};
//# sourceMappingURL=useChessActions.d.ts.map