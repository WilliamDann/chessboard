import select from "./select";
import add from "./add";
import update from "./update";
import trim from './trim';
import header from "./header";
import reorder from "./reorder";
import _delete from "./delete";
// reducer for chessground game tree state
export default function chessReducer(state, action) {
    switch (action.type) {
        case "select": return select(state, action);
        case "add": return add(state, action);
        case "update": return update(state, action);
        case "delete": return _delete(state, action);
        case "trim": return trim(state, action);
        case "reorder": return reorder(state, action);
        case "header": return header(state, action);
    }
}
//# sourceMappingURL=ChessReducer.js.map