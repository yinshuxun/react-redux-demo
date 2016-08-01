import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import * as ItemsActions from "../actions";
import {bindActionCreators} from "redux";
import ImmutableRenderMixin from "react-immutable-render-mixin";


let testData = [{id: 1, name: "a"}, {id: 2, name: "b"}, {id: 3, name: "c"}];

let Item = React.createClass({
    delete(){
        this.props.deleteItem(this.props)
    },
    render(){
        return (
            <tr key={this.props.id}>
                <td>{this.props.id}</td>
                <td>{this.props.name}</td>
                <td>
                    <button onClick={this.delete}>删除
                    </button>
                </td>
            </tr>
        )
    }
})

let ItemList = React.createClass({
    render(){
        return (
            <tbody>
            {this.props.items.map((item, index)=>(
                <Item name={item.name} id={index} key={index} list={this.props.items}
                      deleteItem={this.props.deleteItem}></Item>
            ))}
            </tbody>
        )
    }
})

let ItemNotic = React.createClass({
    render(){
        return (
            <h4>当前所有一共的数量为:<span>{this.props.items.size}</span></h4>
        )
    }
})

let AddItem = React.createClass({
    getInitialState(){
        return {
            list: this.props.items
        }
    },
    add(){
        this.props.addItem({name: this.refs.input.value});
    },
    render(){
        return (
            <div>
                <input ref="input" type="text" placeholder="输入要添加的姓名"/>&nbsp;
                <input type="button" value="添加" onClick={this.add}/>
            </div>
        )
    }
})

let Home = React.createClass({
    mixins: [ImmutableRenderMixin],
    hasLogin() {
        return localStorage.getItem("login") === 'true';
    },
    propTypes: {
        items: React.PropTypes.object
    },
    render() {
        const actions = this.props.actions;
        console.log(this.props.items)
        return this.hasLogin() ?
            (
                <div>
                    hello world!!! {this.props.params.name} 的主页
                    &nbsp;&nbsp;<Link to="/lgOut">点击我退出</Link><br/>
                    <ItemNotic items={this.props.items}></ItemNotic>
                    <AddItem items={this.props.items} addItem={actions.addItem}/>
                    <table>
                        <thead>
                        <tr>
                            <td>序号</td>
                            <td>姓名</td>
                            <td>操作</td>
                        </tr>
                        </thead>
                        <ItemList items={this.props.items} deleteItem={actions.deleteItem}/>
                    </table>
                </div>
            ) :
            (
                <div>
                    您没有登录,需要重新进行登录才行!!!<br/>
                    <Link to="/login">点击我跳到登录页</Link>
                </div>
            )
    }
})
//
export default connect(state=>({
    items: state.items
}), dispatch=>({
    actions: bindActionCreators(ItemsActions, dispatch)
}))(Home)


