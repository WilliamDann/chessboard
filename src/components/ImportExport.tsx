import { makeFen } from "chessops/fen";
import { makePgn, parsePgn, startingPosition, walk } from "chessops/pgn";
import { parseSan } from "chessops/san";
import { useState } from "react";
import { useChessActions, useChessState } from "../context";
import { lookup } from "../context/PositionPath";

import "./pgn.css";

export default function PgnEditor() {
  const state = useChessState();
  const actions = useChessActions();
  // A null draft follows the live game; typing preserves the draft until it is applied.
  const [draft, setDraft] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pgn = state.games.map(makePgn).join("\n\n");
  const fen = makeFen(lookup(state.games, state.selected).position.toSetup());

  const applyPgn = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const games = parsePgn(draft ?? pgn);
    if (games.length === 0) {
      setError("Enter PGN for at least one game.");
      return;
    }

    for (const [index, game] of games.entries()) {
      const start = startingPosition(game.headers);
      if (start.isErr) {
        setError(`Game ${index + 1}: invalid starting position (FEN or variant).`);
        return;
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
        setError(`Game ${index + 1}: invalid move: ${invalidMove}.`);
        return;
      }
    }

    actions.addGames(games);
    setDraft(null);
    setError(null);
  };

  return (
    <form className="chess-pgn-editor" onSubmit={applyPgn}>
      <h2>Import/Export</h2>
      <label htmlFor="chess-pgn">PGN text</label>
      <textarea
        id="chess-pgn"
        value={draft ?? pgn}
        onChange={(event) => {
          setDraft(event.target.value);
          setError(null);
        }}
        rows={8}
        spellCheck={false}
      />
      <label htmlFor="chess-fen">Current Position FEN</label>
      <input id="chess-fen" type="text" value={fen} readOnly />
      {error && <p role="alert">{error}</p>}
      <div className="chess-pgn-actions">
        <button type="submit">Add games</button>
      </div>
    </form>
  );
}
