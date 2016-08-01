import {ADD_ITEM, DELETE_ITEM} from "../constants/actionTypes";
import Immutable from "immutable";

const testData = [{id: 1, name: "a"}, {id: 2, name: "b"}, {id: 3, name: "c"}];
const initialItems = Immutable.List(testData);

export default function items(state = initialItems,action){
    switch(action.type){
        case ADD_ITEM:
            return state.slice(0).concat({
                name: action.name || "default",
                completed: false
            });
        case DELETE_ITEM:
            return state.splice(action.id, 1);;
        default:
            return state;
    }
}