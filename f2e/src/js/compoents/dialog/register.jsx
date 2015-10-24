// 一个组件是一个模块，自己带有自己的样式
import React from 'react';
import AppActions from'../../actions/AppActions';
import AppStore from'../../stores/AppStore';
import './dialog.less';


var Register = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
    },

    componentWillUnmount: function() {
    },

    render: function() {

        return (
            <div className="register">
                <label for="userid" name="userid">用户名</label>
                <input type="text" className="userId" />
                <label for="password" name="password">密码</label>
                <input type="text" className="password" />
                <label for="mail" name="mail">邮箱</label>
                <input type="mail" className="mail" />
                <select name="petType" id="petType">
                    <option value="cat">猫</option>
                    <option value="dog">狗</option>
                    <option value="lizzard">蜥蜴</option>
                    <option value="snack">蛇</option>
                </select>
            </div>
        );
    },

    login: function() {
        var userId = $(".userId").val();
        var password = $(".password").val();


        AppActions.actionRegister(userId,password);
    }

});

export default Register;
