import React from "react";
import {Link} from "react-router";

let From = React.createClass({
    render(){
        return (
            <div>
                <h1>这是一个简单的react+redux的主页!!</h1>
                <br/><br/>
                <div>{this.props.children}</div>
            </div>
        )
    }
})

export default From;
