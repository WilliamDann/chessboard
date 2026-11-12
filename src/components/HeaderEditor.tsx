import { startingPosition, walk } from "chessops/pgn";
import { parseSan } from "chessops/san";
import { Check, Plus, Trash2 } from "lucide-react";
import { useId, useState } from "react";
import { useChessActions, useChessState } from "../context";

import "./header.css";

export default function HeaderEditor() {
  const { games, selected } = useChessState();
  const game = games[selected[0]];
  const actions = useChessActions();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputId = useId();

  const updateHeader = (key: string, nextValue: string | null): boolean => {
    const headers = new Map(game.headers);
    if (nextValue === null)
      headers.delete(key);
    else
      headers.set(key, nextValue);

    const start = startingPosition(headers);
    if (start.isErr) {
      setError("Invalid starting position (FEN or variant).");
      return false;
    }

    let invalidMove: string | undefined;
    walk(game.moves, start.value, (position, data) => {
      const move = parseSan(position, data.san);
      if (!move) {
        invalidMove = data.san;
        return false;
      }
      position.play(move);
    });
    if (invalidMove) {
      setError(`Invalid move with these headers: ${invalidMove}.`);
      return false;
    }

    actions.setHeader(key, nextValue);
    setError(null);
    return true;
  };

  return (
    <section className="chess-header-editor">
      <h2>Headers</h2>
      <ul className="chess-header-list">
        {[...game.headers].map(([key, currentValue], index) => (
          <li key={key}>
            <form onSubmit={(event) => {
              event.preventDefault();
              const nextValue = String(new FormData(event.currentTarget).get("value") ?? "");
              updateHeader(key, nextValue);
            }}>
              <label htmlFor={`${inputId}-${index}`} title={key}>{key}</label>
              <input id={`${inputId}-${index}`} name="value" key={currentValue} defaultValue={currentValue} />
              <button type="submit" aria-label={`Update ${key}`} title={`Update ${key}`}><Check size={16} /></button>
              <button type="button" aria-label={`Remove ${key}`} title={`Remove ${key}`} onClick={() => updateHeader(key, null)}><Trash2 size={16} /></button>
            </form>
          </li>
        ))}
        <li className="chess-header-add">
          <form onSubmit={(event) => {
            event.preventDefault();
            const key = name.trim();
            if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(key)) {
              setError("Enter a valid PGN header name (letters, numbers, or underscores).");
            } else if (game.headers.has(key)) {
              setError(`Header ${key} already exists.`);
            } else if (updateHeader(key, value)) {
              setName("");
              setValue("");
            }
          }}>
            <input aria-label="New header name" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} required />
            <input aria-label="New header value" placeholder="Value" value={value} onChange={(event) => setValue(event.target.value)} />
            <button type="submit" aria-label="Add header" title="Add header"><Plus size={16} /></button>
          </form>
        </li>
      </ul>
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
