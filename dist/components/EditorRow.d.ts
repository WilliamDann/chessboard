import { type ReactNode } from "react";
import "./editor-row.css";
export type Editor = {
    label: string;
    icon: ReactNode;
    editor: ReactNode;
};
type Props = {
    editors: Editor[];
    panelPlacement?: "above" | "below";
};
export default function EditorRow({ editors, panelPlacement }: Props): import("react").JSX.Element;
export {};
//# sourceMappingURL=EditorRow.d.ts.map