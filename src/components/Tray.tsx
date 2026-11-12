import type { ReactNode } from "react";

import "./tray.css";

type Props = {
  children: ReactNode;
};

export default function Tray({ children }: Props) {
  return <div className="tray">{children}</div>;
}
