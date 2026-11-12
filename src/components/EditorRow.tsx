import { useState, type ReactNode } from "react"
import { X } from 'lucide-react'

import "./editor-row.css"

export type Editor = {
  label: string
  icon: ReactNode
  editor: ReactNode
}

type Props = {
  editors: Editor[]
  panelPlacement?: "above" | "below"
}

export default function EditorRow({ editors, panelPlacement = "below" }: Props) {
  const [active, setActive] = useState<number | null>(null);

  const handleButtonClick = (idx: number) => {
    if (idx === active)
      setActive(null)
    else
      setActive(idx);
  }

  return (
    <div className={panelPlacement === "above" ? "editor-row panel-above" : "editor-row"}>
      <div className="editor-row-icons">
        {editors.map((item, idx) => (
          <button
            key={idx}
            className={active === idx ? "selected" : ""}
            type="button"
            aria-label={item.label}
            aria-pressed={active === idx}
            onClick={() => handleButtonClick(idx)}
          >
            <div>{item.icon}</div>
            <p>{item.label}</p>
          </button>
        ))}
      </div>
      {active !== null && (
        <div className="editor-row-panel">
          <p className="close" onClick={() => setActive(null)}><X /></p>
          {editors[active].editor}
        </div>
      )
      }
    </div >
  )
}
