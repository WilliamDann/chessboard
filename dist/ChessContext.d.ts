import type { Dispatch, ReactNode } from 'react';
import type { ChessState, ChessStateAction } from './ChessReducer';
type Props = {
    pgn: string;
    children: ReactNode;
};
export declare function useChessState(): ChessState | null;
export declare function useChessDispatch(): Dispatch<ChessStateAction> | null;
export declare function ChessContext({ pgn, children }: Props): import("react").JSX.Element;
export {};
//# sourceMappingURL=ChessContext.d.ts.map