/**
 * Created by john on 15/10/19.
 */
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import UserStore from'./UserStore';
import  {EventEmitter} from 'events';
import  assign from 'object-assign';
// import Jockey from '../old/jockey.js';
var CHANGE_EVENT = 'change';

var __innerTxt = "";

var AppStore = assign({}, EventEmitter.prototype, {

    // demo 的方法
    getLiveWord:function(){
        return __innerTxt;
    },


    // 找狗按下
    findDog:function(token){
        //地图相关服务
        this.emit(CHANGE_EVENT);
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
        case AppConstants.KEY_ONE:

            __innerTxt = " 事件 1 ";
            AppStore.emitChange();
            break;
        case AppConstants.KEY_TWO:
            __innerTxt = " 事件 2 ";
            AppStore.emitChange();
            break;
        case AppConstants.FIND_DOG:
            if(window.localStorage && localStorage.getItem("token")){
                // 找狗开始
                AppStore.findDog(localStorage.getItem('token'));
            }else{
                // Jockey.send("getToken", {},function(token){
                //     if(token){
                //         AppStore.findDog(localStorage.getItem('token'));
                //     }else{
                //         // 启动登陆窗
                //         UserStore.showUserDialog();
                //     }
                // }.bind(this));
            }
            break;
        default:
        // no op
    }
});

export default AppStore;
