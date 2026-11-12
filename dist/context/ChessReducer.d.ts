import type { Game, PgnNodeData } from "chessops/pgn";
import type { PositionPath } from "./PositionPath";
import type { Move, Position } from "chessops";
export type ChessState = {
    games: Game<PgnNodeData>[];
    selected: PositionPath;
};
export type ChessStateAction = {
    type: "select";
    path: PositionPath;
} | ({
    type: "add";
} & ({
    move: Move;
    position?: never;
    game?: never;
    games?: never;
} | {
    position: Position;
    move?: never;
    game?: never;
    games?: never;
} | {
    game: Game<PgnNodeData>;
    move?: never;
    position?: never;
    games?: never;
} | {
    games: Game<PgnNodeData>[];
    move?: never;
    position?: never;
    game?: never;
} | {
    move?: never;
    position?: never;
    game?: never;
    games?: never;
})) | {
    type: "update";
    path: PositionPath;
    data: Partial<PgnNodeData>;
} | {
    type: "reorder";
    path: PositionPath;
    toIndex: number;
} | {
    type: "delete";
    path: PositionPath;
} | {
    type: "trim";
    path: PositionPath;
    side: "before" | "after";
} | {
    type: "header";
    key: string;
    value: string | null;
};
export type ChessActionOf<T extends ChessStateAction["type"]> = Extract<ChessStateAction, {
    type: T;
}>;
export default function chessReducer(state: ChessState, action: ChessStateAction): ChessState;
//# sourceMappingURL=ChessReducer.d.ts.map