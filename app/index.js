import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router, Route, hashHistory, IndexRedirect, browserHistory} from "react-router";
import routes from "./routes";
import store from "./stores/configureStore";

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router history={hashHistory} router={Route} routes={routes}/>
        </div>
    </Provider>,
    document.querySelector("#app"));
