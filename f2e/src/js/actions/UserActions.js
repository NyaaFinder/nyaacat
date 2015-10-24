/**
 * Created by john on 15/10/24.
 */
import AppDispathcer from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

export default {

    actionRegister: function(user) {
        AppDispathcer.dispatch({
            type: AppConstants.KEY_REGISTER,
            user: user
        });
    },
    actionLogin: function(userid,password) {
        AppDispathcer.dispatch({
            type: AppConstants.KEY_Login,
            userid: userid,
            password: password
        });
    },
};
