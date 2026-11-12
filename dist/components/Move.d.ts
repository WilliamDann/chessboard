import type { PositionPath } from '../context/PositionPath.ts';
import "./move.css";
type Props = {
    path: PositionPath;
    variation?: boolean;
    onSelected?: () => void;
};
export default function Move({ path, variation, onSelected }: Props): import("react").JSX.Element;
export {};
//# sourceMappingURL=Move.d.ts.map