import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRedirect,browserHistory} from 'react-router';
import Form from './components/form';
import Home from './components/reduxHome_1st';
import Logout from './components/lgOut';

ReactDOM.render(
    <Router history={hashHistory} router={Route}>
        <Route path="/">
             <IndexRedirect to="/login"/>
        </Route>
        <Route path="/login" component={Form}>
            <Route>
                path="/home(/:name)"
                onEnter={
                    ({params},replace)=>replace(`/message/${params.name}`)
                }
            </Route>
        </Route>
        <Route path="/home(/:name)(/:pwd)" component={Home}/>
        <Route path="/lgOut" component={Logout}/>
    </Router>, document.querySelector("#app"));
