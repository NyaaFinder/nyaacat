/**
 * Created by john on 15/10/19.
 */
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import NetConstants from '../constants/NetConstants';
import  {EventEmitter} from 'events';
import  assign from 'object-assign';
import $ from 'jquery';
import Jockey from '../old/jockey.js';

var CHANGE_EVENT = 'userChange';

var __userInfo = {code:0,msg:''};
var __showDialog = false;

var UserStore = assign({}, EventEmitter.prototype, {

    register:function(user){
        console.log("注册:",user);
        $.ajax({
            url: NetConstants.rigisterUrl,
            type: 'POST',
            data:user,
            dataType: 'json',
            timeout:15000,
            success: function (rsp,status,xhr) {
                console.log("－－－－－register返回信息－－－－",rsp);
                //__userInfo = {code:-1,msg:''};
                if(rsp.is_success){
                    __userInfo = {code:0,msg:'注册成功'};
                    localStorage.setItem('token',rsp.token);
                    Jockey.send("setToken", {token:rsp.token},function(){});
                    UserStore.closeUserDialog();
                }else{
                    __userInfo = {code:-1,msg:rsp.message};
                }
                UserStore.emitChange();
            },
            error: function (xhr, type) {
                console.log("<-----注册失败------>",xhr,type);
                __userInfo = {code:-1,msg:'请求失败，请检查网络连接'};
                UserStore.emitChange();
            }
        });
    },

    login:function(user){
        console.log("登陆:",user);
        console.log("<===login - ajax请求===>");
        $.ajax({
            url: NetConstants.loginUrl,
            type: 'POST',
            data:user,
            dataType: 'json',
            timeout:15000,
            success: function (rsp,status,xhr) {
                //__userInfo = {code:-1,msg:''};
                if(rsp.is_success){
                    __userInfo = {code:0,msg:'登陆成功'};
                    localStorage.setItem('token',rsp.token);
                    Jockey.send("setToken", {token:rsp.token},function(){});
                    UserStore.closeUserDialog();
                }else{
                    __userInfo = {code:-1,msg:rsp.message};
                }
                UserStore.emitChange();
            },
            error: function (xhr, type) {
                __userInfo = {code:-1,msg:'请求失败，请检查网络连接'};
                UserStore.emitChange();
            }
        });
    },

    showUserDialog:function(){
        __showDialog = true;
        this.emitChange();
    },

    closeUserDialog:function(){
        __showDialog = false;
        this.emitChange();
    },

    getDialogStatus:function(){
        return __showDialog;
    },

    getStatus:function(){
        return __userInfo;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

    switch(action.type) {
        case AppConstants.KEY_REGISTER:
            UserStore.register(action.user);
            break;
        case AppConstants.KEY_LOGIN:
            UserStore.login(action.user);
            break;
        case AppConstants.SHOW_DIALOG:
            UserStore.showUserDialog();
            break;
        default:
        // no op
    }
});

export default UserStore;
