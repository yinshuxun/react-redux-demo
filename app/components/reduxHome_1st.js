import React from 'react';
import {Link} from 'react-router';
import ItemStore from '../stores/itemStores';
import itemAction from '../actions/itemAction'

let testData = [{id: 1, name: "a"}, {id: 2, name: "b"}, {id: 3, name: "c"}];

let Item = React.createClass({
    click(){
        ItemStore.dispatch(itemAction.delete({id: this.props.id}))
    },
    render(){
        return (
            <tr key={this.props.id}>
                <td>{this.props.id}</td>
                <td>{this.props.name}</td>
                <td>
                    <button onClick={this.click}>删除
                    </button>
                </td>
            </tr>
        )
    }
})

let ItemList = React.createClass({
    getInitialState(){
        return {
            list: ItemStore.getState()
        }
    },
    componentDidMount(){
        var unsubscribe = ItemStore.subscribe(this.onChange);
    },
    onChange(){
        this.setState({list: ItemStore.getState()})
    },
    render(){
        return (
            <tbody>
            {this.state.list.map((item, index)=>(
                <Item name={item.name} id={index} key={index} list={this.state.list}></Item>
            ))}
            </tbody>
        )
    }
})

let ItemNotic = React.createClass({
    getInitialState(){
        return {list: ItemStore.getState()}
    },
    componentDidMount(){
        var unsubscribe = ItemStore.subscribe(this.onChange)
    },
    onChange(){
        this.setState({list: ItemStore.getState()})
    },
    render(){
        return (
            <h4>当前选择的数量为:<span>{this.state.list.length}</span></h4>
        )
    }
})

let AddItem = React.createClass({
    getInitialState(){
        return {
            list: ItemStore.getState()
        }
    },
    add(){
        ItemStore.dispatch(itemAction.add({name: this.refs.input.value}));
    },
    render(){
        return (
            <div>
                <input ref="input" type="text" placeholder="输入要添加的姓名"/>&nbsp;<input type="button" value="添加"
                                                                                    onClick={this.add}/>
            </div>
        )
    }
})


export  default class Home extends React.Component {
    hasLogin() {
        return localStorage.getItem("login") === 'true';
    }

    render() {
        return this.hasLogin() ?
            (
                <div>
                    hello world!!! {this.props.params.name} 的主页
                    &nbsp;&nbsp;<Link to="/lgOut">点击我退出</Link><br/>
                    <ItemNotic data={testData}></ItemNotic>
                    <AddItem data={testData}/>
                    <table>
                        <thead>
                        <tr>
                            <td>序号</td>
                            <td>姓名</td>
                            <td>操作</td>
                        </tr>
                        </thead>
                        <ItemList data={testData}/>
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
}
