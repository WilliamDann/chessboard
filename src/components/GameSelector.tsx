import { Plus, Trash2 } from "lucide-react";
import { Chess } from "chessops/chess";
import { parseFen } from "chessops/fen";
import { useState, type SubmitEvent } from "react";
import { useChessActions, useChessState } from "../context";

import "./game-selector.css";

export default function GameSelector() {
  const { games, selected } = useChessState();
  const actions = useChessActions();
  const [showPositionForm, setShowPositionForm] = useState(false);
  const [fen, setFen] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addPosition = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const setup = parseFen(fen.trim());
    const position = setup.isErr ? undefined : Chess.fromSetup(setup.value);
    if (!position || position.isErr) {
      setError("Enter a valid chess FEN.");
      return;
    }

    actions.addPosition(position.value);
    setFen("");
    setError(null);
    setShowPositionForm(false);
  };

  return (
    <section className="game-selector" aria-label="Games">
      <h2>Games</h2>
      <ul>
        {games.map((game, index) => {
          const white = game.headers.get("White")?.trim();
          const black = game.headers.get("Black")?.trim();
          return (
            <li key={index}>
              <button
                type="button"
                aria-current={selected[0] === index ? "true" : undefined}
                onClick={() => actions.select([index])}
              >
                Game {index + 1}{white || black ? `: ${white || "?"} vs ${black || "?"}` : ""}
              </button>
              <button
                className="game-selector-remove"
                type="button"
                aria-label={`Remove game ${index + 1}`}
                title={games.length === 1 ? "At least one game is required" : `Remove game ${index + 1}`}
                disabled={games.length === 1}
                onClick={() => actions.deleteGame(index)}
              >
                <Trash2 size={16} /> Remove
              </button>
            </li>
          );
        })}
      </ul>
      <div className="game-selector-actions">
        <button type="button" onClick={() => actions.addGame()}>
          <Plus size={16} /> Add game
        </button>
        <button type="button" aria-expanded={showPositionForm} onClick={() => {
          setShowPositionForm(!showPositionForm);
          setError(null);
        }}>
          <Plus size={16} /> Add Position
        </button>
      </div>
      {showPositionForm && (
        <form className="game-selector-position-form" onSubmit={addPosition}>
          <label>
            FEN
            <input
              type="text"
              value={fen}
              onChange={(event) => {
                setFen(event.target.value);
                setError(null);
              }}
              required
              autoFocus
            />
          </label>
          {error && <p role="alert">{error}</p>}
          <button type="submit">Create position</button>
        </form>
      )}
    </section>
  );
}
