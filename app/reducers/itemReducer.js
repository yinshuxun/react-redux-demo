// reducers
let itemReducer = (state, action)=> {
    if (typeof state === 'undefined') {
        return [];
    }
    switch (action.type) {
        case 'add_item':
            return state.slice(0).concat({
                name: action.name || "default",
                completed: false
            });
            break;
        case 'del_item':
            state.splice(action.id, 1);
            return state;
            break;
        default:
            return state;
    }
}
export default itemReducer;