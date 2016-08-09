import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import * as ItemsActions from "../actions";
import {bindActionCreators} from "redux";

class lgOut extends React.Component {
    componentDidMount() {
        localStorage.setItem("login", false);
        this.props.actions.clearItems();
    }
    render() {
        return (
            <div>
                <p>已经退出!</p>
                <Link to="/login">返回登录页</Link>
            </div>
        )
    }
}

export default connect(state=>({
    items: state.items
}), dispatch=>({
    actions: bindActionCreators(ItemsActions, dispatch)
}))(lgOut)