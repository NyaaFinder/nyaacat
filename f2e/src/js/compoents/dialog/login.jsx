// 一个组件是一个模块，自己带有自己的样式
import React from 'react';
import AppActions from'../../actions/AppActions';
import AppStore from'../../stores/AppStore';
import UserStore from'../../stores/UserStore';
import './dialog.less';


var Login = React.createClass({

    getInitialState: function() {
        return {loginInfo:null};
    },

    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange);
    },

    _onChange:function(){
        this.setState(this.getStateFromStore());
    },

    getStateFromStore:function(){
        return {
            loginInfo:UserStore.getStatus()
        };
    },

    render: function() {

        return (
            <div className="form__wrapper login">
                <div className="form__wrapper__item">
                    <label htmlFor="userid" for="userid" name="userid">用户名</label>
                    <input type="text" className="userId" />
                </div>
                <div className="form__wrapper__item">
                    <label htmlFor="password" for="password" name="password">密码</label>
                    <input type="text" className="password" />
                </div>
            </div>
        );
    },

    login: function() {
        var userId = $(".userId").val();
        var password = $(".password").val();
        AppActions.actionLogin(userId,password);
    }

});

export default Login;
