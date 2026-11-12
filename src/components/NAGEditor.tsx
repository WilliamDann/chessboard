import { isChildNode } from "chessops/pgn";
import { useState } from "react";
import { useChessActions, useChessState } from "../context";
import { lookup } from "../context/PositionPath";
import { NAGs } from "../NAG";

import "./nag.css";

const commonGroups = [
  {
    label: "Move quality",
    annotations: [
      { code: 1, label: "Good move" },
      { code: 2, label: "Mistake" },
      { code: 3, label: "Brilliant move" },
      { code: 4, label: "Blunder" },
      { code: 5, label: "Interesting move" },
      { code: 6, label: "Dubious move" },
      { code: 7, label: "Only move" },
      { code: 22, label: "Zugzwang" },
    ],
  },
  {
    label: "Position",
    annotations: [
      { code: 10, label: "Equal position" },
      { code: 13, label: "Unclear position" },
      { code: 14, label: "White is slightly better" },
      { code: 15, label: "Black is slightly better" },
      { code: 16, label: "White is better" },
      { code: 17, label: "Black is better" },
      { code: 18, label: "White is winning" },
      { code: 19, label: "Black is winning" },
    ],
  },
  {
    label: "Ideas and themes",
    annotations: [
      { code: 146, label: "Novelty" },
      { code: 32, label: "Development" },
      { code: 36, label: "Initiative" },
      { code: 40, label: "Attack" },
      { code: 132, label: "Counterplay" },
      { code: 138, label: "Time trouble" },
      { code: 44, label: "With compensation" },
      { code: 140, label: "With the idea" },
    ],
  },
];

const commonLabels = new Map(
  commonGroups.flatMap(({ annotations }) => annotations.map(({ code, label }) => [code, label] as const)),
);

const availableNags = Object.entries(NAGs).map(([code, nag]) => ({
  code: Number(code),
  ...nag,
  label: commonLabels.get(Number(code)),
}));

type NAGButtonProps = {
  code: number;
  selected: boolean;
  onToggle: (code: number) => void;
  detailed?: boolean;
  label?: string;
};

function NAGButton({ code, selected, onToggle, detailed = false, label }: NAGButtonProps) {
  const nag = NAGs[code];
  const description = nag?.description ?? "Unknown annotation";

  return (
    <button
      type="button"
      className="nag-editor-button"
      aria-label={label ? `${label} ($${code}: ${description})` : `$${code}: ${description}`}
      aria-pressed={selected}
      title={`$${code}: ${description}`}
      onClick={() => onToggle(code)}
    >
      <span className={`nag-editor-symbol ${nag?.className ?? ""}`}>{nag?.symbol || `$${code}`}</span>
      {nag?.symbol && !label && <span className="nag-editor-code">${code}</span>}
      {(detailed || label) && <span className="nag-editor-description">{label ?? description}</span>}
    </button>
  );
}

export default function NAGEditor() {
  const state = useChessState();
  const actions = useChessActions();
  const [search, setSearch] = useState("");

  const { node } = lookup(state.games, state.selected);
  if (!isChildNode(node))
    return <h2>Annotations</h2>;

  const selectedNags = node.data.nags ?? [];
  const query = search.trim().toLowerCase();
  const matches = query
    ? availableNags.filter(({ code, description, symbol, label }) =>
      description.toLowerCase().includes(query) ||
      label?.toLowerCase().includes(query) ||
      (symbol && symbol.toLowerCase().includes(query)) ||
      (/^\$?\d+$/.test(query) && String(code).includes(query.replace(/^\$/, ""))),
    )
    : [];

  const toggle = (code: number) => {
    actions.updateNode(state.selected, {
      nags: selectedNags.includes(code)
        ? selectedNags.filter((nag) => nag !== code)
        : [...selectedNags, code],
    });
  };

  return (
    <section className="nag-editor" aria-label="Move annotations">
      <h2>Annotations</h2>
      {selectedNags.length > 0 && (
        <div>
          <h3>Selected</h3>
          <div className="nag-editor-buttons">
            {selectedNags.map((code) => (
              <NAGButton key={code} code={code} selected onToggle={toggle} detailed />
            ))}
          </div>
        </div>
      )}
      <div className="nag-editor-groups">
        {commonGroups.map(({ label, annotations }) => (
          <div key={label}>
            <h3>{label}</h3>
            <div className="nag-editor-buttons">
              {annotations.map(({ code, label }) => (
                <NAGButton
                  key={code}
                  code={code}
                  label={label}
                  selected={selectedNags.includes(code)}
                  onToggle={toggle}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <label htmlFor="nag-search">Search all annotations</label>
      <input
        id="nag-search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Description, symbol, or $number"
      />
      {query && (
        <div className="nag-editor-results">
          {matches.length > 0 ? (
            matches.map(({ code }) => (
              <NAGButton
                key={code}
                code={code}
                selected={selectedNags.includes(code)}
                onToggle={toggle}
                detailed
              />
            ))
          ) : (
            <p>No annotations found.</p>
          )}
        </div>
      )}
    </section>
  );
}
