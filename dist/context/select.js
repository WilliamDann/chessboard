export default function select(state, action) {
    return {
        ...state,
        selected: action.path
    };
}
//# sourceMappingURL=select.js.map