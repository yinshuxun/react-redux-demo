import {createStore} from "redux";
import itemReducer from  "../reducers/itemReducer";

const itemStore = createStore(itemReducer);

export default itemStore;