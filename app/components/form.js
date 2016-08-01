import React from "react";
import {Link} from "react-router";

let Input = React.createClass({
    render(){
        return <div>
            <input type={this.props.type} ref="inp"/>
        </div>
    }
})

let From = React.createClass({
    getInitialState(){
        return {
            username: "ysx"
        }
    },
    submitForm(event){
        const name = event.target.elements[0].value,
            pwd = event.target.elements[1].value,
            path = `/home/${name}/${pwd}`;
        if ("123" !== pwd) {
            return;
        }
        localStorage.setItem("login", true);
        this.context.router.push(path);
    },
    hasLogin(){
        return localStorage.getItem("ysx-ysx");
    },
    contextTypes: {
        router: React.PropTypes.object
    },
    render(){
        return this.hasLogin() ? (
            <span>您已经登录!!<Link to="/lgOut">退出</Link></span>
        ):(
            <form onSubmit={this.submitForm}>
                <div>登录</div>
                <Input type="username" placeholder="username"/>
                <Input type="password" hasBt="true" placeholder="pwd"/>
                <button type="submit">点击我登录</button>
                <Link to="/home">进入主页</Link><br></br>
            </form>
        )
    }
})

export default From;
