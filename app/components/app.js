import React from "react";
import {Link} from "react-router";
import "../scss/index.scss";
import "../assets/stylesheets/_bootstrap.scss";

let From = React.createClass({
    render(){
        return (
            <div className="container">
                <h1>这是一个简单的react+redux的主页!!</h1>
                <br/><br/>
                <div>{this.props.children}</div>
            </div>
        )
    }
})

export default From;
