/**
 * Created by john on 15/10/19.
 */
import AppDispathcer from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

export default {

    actionOne: function(txt) {
        AppDispathcer.dispatch({
            type: AppConstants.KEY_ONE,
            text: txt
        });
    },
    actionTwo: function(txt) {
        AppDispathcer.dispatch({
            type: AppConstants.KEY_TWO,
            text: txt
        });
    },
    actionFindDog:function(){
        console.log("进入分发：");
        if(window.localStorage && localStorage.getItem("user")){
            // 找狗开始
            AppDispathcer.dispatch({
                type: AppConstants.FIND_DOG,
                text: null
            });
        }else{
            // 启动登陆窗
            AppDispathcer.dispatch({
                type: AppConstants.SHOW_DIALOG,
                text: null
            });
        }
    }
};
