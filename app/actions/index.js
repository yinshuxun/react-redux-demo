import {ADD_ITEM, DELETE_ITEM, GET_ITEMS, CLEAR_ITEMS} from "../constants/actionTypes";
import data from "../../static/data/data";
import Immutable from "immutable";

// export function addItem(item) {
//     return dispatch=> {
//         //模拟异步请求
//         setTimeout(()=> {
//             dispatch({type: ADD_ITEM, name: item.name});
//         }, 1000)
//     }
// }
export function getItems() {
    return dispatch=> {
        setTimeout(()=> {
            dispatch({type: GET_ITEMS, items: Immutable.List(data)})
        }, 2000)
    }
}

export function clearItems() {
    return {
        type :CLEAR_ITEMS
    }
}

export function addItem(item) {
    return {
        type: ADD_ITEM,
        name: item.name
    }
}

export function deleteItem(item) {
    return {
        type: DELETE_ITEM,
        id: item.id,
    }
}