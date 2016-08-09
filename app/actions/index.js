import {ADD_ITEM, DELETE_ITEM} from "../constants/actionTypes";

export function addItem(item) {
    return dispatch=> {
        //模拟异步请求
        setTimeout(()=> {
            dispatch({type: ADD_ITEM, name: item.name});
        }, 1000)
    }
}

// export function addItem(item) {
//     return {
//         type: ADD_ITEM,
//         name: item.name
//     }
// }

export function deleteItem(item) {
    return {
        type: DELETE_ITEM,
        id: item.id,
    }
}