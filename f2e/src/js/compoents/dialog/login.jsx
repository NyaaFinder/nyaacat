// 一个组件是一个模块，自己带有自己的样式
import React from 'react';
import UserActions from'../../actions/UserActions';
import AppStore from'../../stores/AppStore';
import UserStore from'../../stores/UserStore';
import $ from 'jquery';
//import './dialog.less';


var Login = React.createClass({

    getInitialState: function() {
        return {
            warn:this.getStateFromStore()
        };
    },

    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange);

    }
    ,

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange);
    },

    _onChange:function(){
        if(UserStore.getDialogStatus()){
            console.log("login onChange----><<<<<<");
            this.setState({
                warn:this.getStateFromStore()
            });
            if(!this.getStateFromStore()){
                setTimeout(function(){
                    UserStore.closeUserDialog();
                },500);
            }
        }


    },

    getStateFromStore:function(){

        var userInfo = UserStore.getStatus();
        if(userInfo){
            if(userInfo.code==0){
                return userInfo.msg;
            }else{
                return userInfo.msg
            }
        }else {
            return "";
        }
    },

    render: function() {
        return (
            <div className="form__wrapper login animated fadeIn">
                <div className="form__wrapper__item">
                    <label htmlFor="userid" for="userid" name="pet_name">用户名</label>
                    <input type="text" className="userId"/>
                </div>
                <div className="form__wrapper__item">
                    <label htmlFor="password" for="password" name="password">密码</label>
                    <input type="text" className="password" />
                </div>
                <button className="form__wrapper__button submit" onClick={this.login}>登陆</button>
                <div className="warning">{this.state.warn}</div>
            </div>
        );
    },

    login: function(e) {
         e.preventDefault();
        var userId = document.querySelector('.userId').value;
        var password = document.querySelector('.password').value;
        var user = {
            pet_name:userId,
            password:password
        };
        console.log("<=====注册对象:",userId,password,"=====>");
        UserActions.actionLogin(user);
    }

});

export default Login;
