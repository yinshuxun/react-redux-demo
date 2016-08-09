import {ADD_ITEM, DELETE_ITEM, GET_ITEMS, CLEAR_ITEMS} from "../constants/actionTypes";
import Immutable from "immutable";

const testData = [{id: 1, name: "a"}, {id: 2, name: "b"}, {id: 3, name: "c"}];
const initialItems = Immutable.List(testData);
const loadingItems = Immutable.List([{id: 0, name: "正在加载..."}]);

export default function items(state = loadingItems, action) {
    switch (action.type) {
        case ADD_ITEM:
            return state.slice(0).concat({
                name: action.name || "default",
                completed: false
            });
        case DELETE_ITEM:
            return state.splice(action.id - 1, 1);
        case GET_ITEMS:
            return state = action.items;
        case CLEAR_ITEMS:
            return state = loadingItems;
        default:
            return state;
    }
}