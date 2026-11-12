import type { Key, MoveMetadata } from '@lichess-org/chessground/types';
import type { Config } from '@lichess-org/chessground/config';
import type { DrawShape } from '@lichess-org/chessground/draw';
import "./board.css";
type Props = {
    fen: string;
    config: Config;
    shapes: DrawShape[];
    onShapesChange: (shapes: DrawShape[]) => void;
    onMove: (origin: Key, destination: Key, metadata: MoveMetadata) => void;
};
/** React wrapper for chessground */
export default function Chessground({ fen, config, shapes, onShapesChange, onMove }: Props): import("react").JSX.Element;
export {};
//# sourceMappingURL=Chessground.d.ts.map