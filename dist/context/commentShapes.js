import { makeSquare, parseSquare } from 'chessops';
import { makeComment, parseComment } from 'chessops/pgn';
const colors = ['green', 'red', 'yellow', 'blue'];
// parseComment trims text, so remove PGN annotations without trimming the
// surrounding text (including newlines at either end of a comment).
function commentText(comment) {
    let startsWithAnnotation = false;
    const text = comment.replace(/ ?\[%[^\]]+\]/g, (match, offset) => {
        const directive = match.trimStart();
        const parsed = parseComment(directive);
        if (parsed.text || !(parsed.shapes.length || parsed.evaluation || parsed.emt !== undefined || parsed.clock !== undefined))
            return match;
        if (offset === 0 && !match.startsWith(' '))
            startsWithAnnotation = true;
        return '';
    });
    return startsWithAnnotation && text.startsWith(' ') ? text.slice(1) : text;
}
export function getShapes(comments) {
    return (comments ?? []).flatMap(comment => parseComment(comment).shapes.map(shape => ({
        orig: makeSquare(shape.from),
        ...(shape.from === shape.to ? {} : { dest: makeSquare(shape.to) }),
        brush: shape.color,
    })));
}
export function withShapes(comments, shapes) {
    const pgnShapes = shapes.flatMap(shape => {
        const from = parseSquare(shape.orig);
        const to = parseSquare(shape.dest ?? shape.orig);
        if (from === undefined || to === undefined || !colors.includes(shape.brush))
            return [];
        return [{ color: shape.brush, from, to }];
    });
    const existing = comments ?? [];
    const index = existing.findIndex(comment => parseComment(comment).shapes.length > 0);
    const target = index < 0 && existing.length ? 0 : index;
    if (target < 0)
        return pgnShapes.length ? [makeComment({ shapes: pgnShapes })] : [];
    return existing.flatMap((comment, i) => {
        const parsed = parseComment(comment);
        if (i !== target && !parsed.shapes.length)
            return [comment];
        const updated = makeComment({ ...parsed, text: commentText(comment), shapes: i === target ? pgnShapes : [] });
        return updated ? [updated] : [];
    });
}
export function getCommentText(comments) {
    return (comments ?? []).map(commentText).filter(Boolean).join(' ');
}
export function withCommentText(comments, text) {
    if (!comments?.length)
        return text ? [text] : [];
    return comments.flatMap((comment, i) => {
        const updated = makeComment({ ...parseComment(comment), text: i === 0 ? text : '' });
        return updated ? [updated] : [];
    });
}
//# sourceMappingURL=commentShapes.js.map