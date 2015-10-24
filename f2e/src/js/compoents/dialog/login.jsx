// 一个组件是一个模块，自己带有自己的样式
import React from 'react';
import AppActions from'../../actions/AppActions';
import AppStore from'../../stores/AppStore';
import './dialog.less';


var Login = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
    },

    render: function() {

        return (
            <div className="login">
                <label for="userid" name="userid">用户名</label>
                <input type="text" className="userId" />
                <label for="password" name="password">密码</label>
                <input type="text" className="password" />
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
