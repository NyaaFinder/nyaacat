// 一个组件是一个模块，自己带有自己的样式
import React from 'react';
import AppActions from'../../actions/AppActions';
import AppStore from'../../stores/AppStore';
import UserStore from'../../stores/UserStore';
import './dialog.less';


var Register = React.createClass({

    getInitialState: function() {
        return {registerInfo:null};
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
                registerInfo:UserStore.getStatus()
            };
        },

    render: function() {

        return (
            <div className="form__wrapper register">
                <div className="form__wrapper__item">
                    <label htmlFor="userid" name="userid">用户名</label>
                    <input type="text" className="userId" />
                </div>
                <div className="form__wrapper__item">
                    <label htmlFor="password" name="password">密码</label>
                    <input type="text" className="password" />
                </div>
                <div className="form__wrapper__item">
                    <label htmlFor="mail" name="mail">邮箱</label>
                    <input type="mail" className="mail" />
                </div>
                <div className="form__wrapper__item">
                    <label htmlFor="mail" name="mail">宠物类型</label>
                    <select name="petType" id="petType">
                        <option value="cat">猫</option>
                        <option value="dog">狗</option>
                        <option value="lizzard">蜥蜴</option>
                        <option value="snack">蛇</option>
                    </select>
                </div>
            </div>
        );
    },

    register: function() {
        var userId = $(".userId").val();
        var password = $(".password").val();


        AppActions.actionRegister(userId,password);
    }

});

export default Register;
