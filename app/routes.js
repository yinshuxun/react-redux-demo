import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/app";
import Form from "./components/form";
import Home from "./components/reduxHome_2st";
import Logout from "./components/lgOut";

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Form}/>
        <Route path="/login" component={Form}/>
        <Route path="/home(/:name)(/:pwd)" component={Home}/>
        <Route path="/lgOut" component={Logout}/>
    </Route>
)
