// 一个组件是一个模块，自己带有自己的样式
import React from 'react';
import UserActions from'../../actions/UserActions';
import AppStore from'../../stores/AppStore';
import UserStore from'../../stores/UserStore';
import './dialog.less';
// import Jockey from '../../old/jockey.js';


var Register = React.createClass({

    getInitialState: function() {
        return {
            registerInfo:null,
            pet:'pet',//初始化，要改回null
            preventClick:false,
            warn:this.getStateFromStore()
        };
    },

    componentDidMount: function() {

        // Jockey.on("selectPetsDone",function(data){
        //     this.setState({
        //         pet:data.name,
        //         preventClick:false,
        //         petId:data.id
        //     });
        // })
        UserStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange);
    },

    _onChange:function(){
        if(UserStore.getDialogStatus()){
            this.setState({
                warn:this.getStateFromStore()
            });
            if(!this.getStateFromStore()) {
                setTimeout(function () {
                    UserStore.closeUserDialog();
                }, 500);
            }
        }

    },

    getClientList:function(){
        if(!this.state.preventClick){
            console.log("get selectPets");
            this.setState({
                preventClick:true
            });
            // Jockey.send("selectPets", {},function(){});

             this.setState({
                 pet:"peter111",
                 preventClick:false,
                 petId:123456
             });
        }


    },

    getStateFromStore:function(){
        var registerInfo = UserStore.getStatus();
        if(registerInfo){
            if(registerInfo.code==0){
                return registerInfo.msg;
            }else{
                return registerInfo.msg
            }
        }else {
            return "";
        }
    },

    render: function() {

        return (
            <div className="form__wrapper register animated fadeIn">
                <div className="form__wrapper__item">
                    <label htmlFor="mail" name="mail" >邮箱</label>
                    <input type="mail" className="mail" />
                </div>
                <div className="form__wrapper__item">
                    <label htmlFor="password" name="password">密码</label>
                    <input type="text" className="password" />
                </div>
                <div className="form__wrapper__item">
                    <label htmlFor="userid" name="userid">宠物名</label>
                    <input type="text" className="userId" />
                </div>
                <div className="form__wrapper__item">
                    <label htmlFor="mail" name="mail">宠物类型</label>
                    <select name="petType" id="petType" className="petType">
                        <option value="cat">猫</option>
                        <option value="dog">狗</option>
                        <option value="lizzard">蜥蜴</option>
                        <option value="snack">蛇</option>
                    </select>
                </div>
                <div className="form__wrapper__item">
                    <label htmlFor="mail" name="mail">蓝牙标识</label>
                    <input value={this.state.pet} className="bluetooth" id="bluetooth" name="bluetooth" onClick={this.getClientList} placeholder="点击选择" disabled/>
                </div>
                <div className="form__wrapper__button submit" onClick={this.register}>注册</div>
                <div className="warning">{this.state.warn}</div>
            </div>
        );
    },

    register: function() {
        var q = document.querySelector;
        var user = {
            pet_name:document.querySelector('input.userId').value,
            password:document.querySelector('input.password').value,
            mail:document.querySelector('input.mail').value,
            bluetooth:document.querySelector('.bluetooth').value,
            pet_type:document.querySelector('.petType').value
        };
        UserActions.actionRegister(user);
    }

});

export default Register;
