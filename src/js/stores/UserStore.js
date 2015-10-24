/**
 * Created by john on 15/10/19.
 */
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import NetConstants from '../constants/NetConstants';
import  {EventEmitter} from 'events';
import  assign from 'object-assign';

var CHANGE_EVENT = 'userChange';

var __userInfo = {code:0,msg:''};
var __showDialog = false;

var UserStore = assign({}, EventEmitter.prototype, {

    rigister:function(user){
        $.ajax({
            url: NetConstants.rigisterUrl,
            type: 'POST',
            data:{},
            dataType: 'json',
            timeout:15000,
            success: function (rsp,status,xhr) {
                console.log("register",rsp);
                //__userInfo = {code:-1,msg:''};
                __userInfo = {code:0,msg:'注册成功'};
                UserStore.emitChange();
            },
            error: function (xhr, type) {
                __userInfo = {code:-1,msg:'请求失败，请检查网络连接'};
                UserStore.emitChange();
            }
        });
    },

    login:function(userid,password){
        $.ajax({
            url: NetConstants.loginUrl,
            type: 'POST',
            data:{},
            dataType: 'json',
            timeout:15000,
            success: function (rsp,status,xhr) {
                //__userInfo = {code:-1,msg:''};
                __userInfo = {code:0,msg:'注册成功'};
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
            UserStore.rigister(action);
            break;
        case AppConstants.KEY_LOGIN:
            UserStore.login(action);
            break;
        case AppConstants.SHOW_DIALOG:
            UserStore.showUserDialog(action);
            break;
        default:
        // no op
    }
});

export default UserStore;
