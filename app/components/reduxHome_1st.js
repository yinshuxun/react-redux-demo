import React from 'react';
import {Link} from 'react-router';
import {createStore} from "redux";

let testData = [{id: 1, name: "a"}, {id: 2, name: "b"}, {id: 3, name: "c"}];

// action creator
let actions = {
    delete: item=>({
        type: 'del_item',
        id: item.id
    }),
    add: item=>({
        type: 'add_item',
        name: item.name,
    })
};

// reducers
let itemReducer = function (state, action) {
    if (typeof state === 'undefined') {
        return [];
    }
    switch (action.type) {
        case 'add_item':
            return state.slice(0).concat({
                name: action.name || "default",
                completed: false
            });
            break;
        case 'del_item':
            state.splice(action.id, 1);
            return state;
            break;
        default:
            return state;
    }
};

let store = createStore(itemReducer);

let Item = React.createClass({
    click(){
        store.dispatch(actions.delete({id: this.props.id}))
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
            list: store.getState()
        }
    },
    componentDidMount(){
        var unsubscribe = store.subscribe(this.onChange);
    },
    onChange(){
        this.setState({list: store.getState()})
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
        return {list: store.getState().length}
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
            list: store.getState()
        }
    },
    add(){
        store.dispatch(actions.add({name: this.refs.input.value}));
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
