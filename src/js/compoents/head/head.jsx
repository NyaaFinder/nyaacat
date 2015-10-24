/**
 * Created by john on 15/10/24.
 */
// 一个组件是一个模块，自己带有自己的样式
import React from 'react';
import AppActions from'../../actions/AppActions';
import AppStore from'../../stores/AppStore';
import './head.less';


var Foot = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
    },

    componentWillUnmount: function() {
    },

    render: function() {

        return (
            <div className="head">
                <div style={{backgroundImage: 'url(http://git.souche.com/uploads/user/avatar/77/Slice_1.png)'}} className="avator"></div>
                <div className="userInfo">
                    <div className="name">咪咪</div>
                    <div className="mail">myfavpet@foxmail.com</div>
                </div>
            </div>
        );
    }
});

export default Foot;
