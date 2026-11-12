import type { Key, MoveMetadata } from '@lichess-org/chessground/types';
import type { Config } from '@lichess-org/chessground/config';
import "./styles.css";
type Props = {
    fen: string;
    config: Config;
    onMove: (origin: Key, destination: Key, metadata: MoveMetadata) => void;
};
/** React wrapper for chessground */
export default function Chessground({ fen, config, onMove }: Props): import("react").JSX.Element;
export {};
//# sourceMappingURL=Chessground.d.ts.map