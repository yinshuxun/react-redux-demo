import React from 'react';
import {Link} from 'react-router'

export default class lgOut extends React.Component{
    componentDidMount(){
        localStorage.setItem("login",false)
    }
    render(){
        return (
            <div>
                <p>已经退出!</p>
                <Link to="/login">返回登录页</Link>
            </div>
        )

    }
}