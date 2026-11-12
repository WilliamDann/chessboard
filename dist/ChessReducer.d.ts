import type { Game, PgnNodeData } from "chessops/pgn";
import type { PositionPath } from "./PositionPath.ts";
import type { Move } from "chessops";
export type ChessState = {
    game: Game<PgnNodeData>;
    selected: PositionPath;
};
export type ChessStateAction = {
    type: "select";
    path: PositionPath;
} | {
    type: "play";
    move: Move;
} | {
    type: "delete";
    path: PositionPath;
} | {
    type: "update";
    path: PositionPath;
    data: Partial<PgnNodeData>;
};
export default function chessReducer(state: ChessState, action: ChessStateAction): ChessState;
//# sourceMappingURL=ChessReducer.d.ts.map