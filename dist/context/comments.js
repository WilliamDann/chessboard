import replaceGame from './replaceGame';
import update from './update';
export default function comments(state, action) {
    if (action.path.length > 1)
        return update(state, { type: 'update', path: action.path, data: { comments: action.comments } });
    const index = action.path[0];
    const game = state.games[index];
    if (!game)
        return state;
    return replaceGame(state, index, { ...game, comments: action.comments });
}
//# sourceMappingURL=comments.js.map