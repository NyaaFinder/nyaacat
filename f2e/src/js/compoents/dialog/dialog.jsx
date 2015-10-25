// 一个组件是一个模块，自己带有自己的样式
import React from 'react';
import AppActions from'../../actions/AppActions';
import AppStore from'../../stores/AppStore';
import UserStore from'../../stores/UserStore';
import classNames from 'classnames';
import Login from './login.jsx';
import Register from './register.js';
import './dialog.less';

var Dialog = React.createClass({

    getInitialState: function() {
        return {
            isLogin:true,
            showDialog:this.getStatusFromStore()
        };
    },

    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({
            showDialog:this.getStatusFromStore()
        });
    },

    renderItem:function(){
      if(this.state.isLogin){
          return <Login/>
      }else{
          return <Register/>
      }
    },

    changeStatus: function () {
        this.setState({
            isLogin:!this.state.isLogin
        });
    },

    closeDialog:function(){
        this.setState({
            showDialog:false
        });
    },

    getStatusFromStore:function(){
        return UserStore.getDialogStatus();
    },

    render: function() {
        if(this.state.showDialog){
            return (
                <div className="dialog">
                    <div className="dialog__wrapper">
                        <div className="userForm">
                            {this.renderItem()}
                        </div>
                        <div className="sideBar">
                            <a href="javscript:void(0)" className={classNames({
                            'active':this.state.isLogin,
                            'sideBar__item': true,
                            'sideBar__item-login': true
                        })} onClick={this.changeStatus}>
                                登陆
                            </a>
                            <a href="javscript:void(0)" className={classNames({
                            'active':!this.state.isLogin,
                            'sideBar__item': true,
                            'sideBar__item-register': true
                        })} onClick={this.changeStatus}>
                                注册
                            </a>
                        </div>
                        <button className="closeBtn" onClick={this.closeDialog}></button>
                    </div>
                </div>
            );
        }else{
            return (<div></div>);
        }

    }

});

export default Dialog;
