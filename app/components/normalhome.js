import React from "react";
import {Link} from "react-router";

let testData = [{id: 1, name: "a"}, {id: 2, name: "b"}, {id: 3, name: "c"}];

Array.prototype.remove = function (key, value) {
    let curr = 0;
    this.map((item, index)=> {
        if (item[key] === value) curr = index;
        if (curr != 0) this[index - 1] = item;
    }).bind(this);
}

// 简单实现了一下 subscribe 和 dispatch
var EventEmitter = {
    _events: {},
    dispatch: function (event, data) {
        if (!this._events[event]) { // 没有监听事件
            return;
        }
        for (var i = 0; i < this._events[event].length; i++) {
            this._events[event][i](data);
        }
    },
    subscribe: function (event, callback) {
        // 创建一个新事件数组
        if (!this._events[event]) {
            this._events[event] = [];
        }
        this._events[event].push(callback);
    }
};

let Item = React.createClass({
    select(){

    },
    delete(){
        this.props.list.splice(this.props.id, 1)
        EventEmitter.dispatch("delete");
    },
    render(){
        return (
            <tr key={this.props.id}>
                <td>{this.props.id}</td>
                <td>{this.props.name}</td>
                <td>
                    <button onClick={this.delete}>删除</button>
                </td>
            </tr>
        )
    }
})

let ItemList = React.createClass({
    getInitialState(){
        return {
            list: this.props.data
        }
    },
    componentDidMount(){
        EventEmitter.subscribe("delete", ()=> {
            this.setState({list: this.state.list});
        })
        EventEmitter.subscribe("add",(data)=>{
            this.state.list.push(data);
            this.setState({list: this.state.list});
        })
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
        return {list: this.props.data}
    },
    componentDidMount(){
        EventEmitter.subscribe("delete", ()=> {
            this.setState({list: this.state.list})
        })
        EventEmitter.subscribe("add", ()=> {
            this.setState({list: this.state.list})
        })
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
            list: this.props.data
        }
    },
    add(){
        EventEmitter.dispatch("add",{name:this.state.inputValue})
    },
    change(e){
        this.setState({inputValue:e.currentTarget.value});
    },
    render(){
        return (
            <div>
                <input type="text" placeholder="输入要添加的姓名" onChange={this.change}/>&nbsp;<input type="button" value="添加" onClick={this.add}/>
            </div>
        )
    }

})

export default class Home extends React.Component {
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