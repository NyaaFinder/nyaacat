/**
 * Created by john on 15/10/24.
 */
// 一个组件是一个模块，自己带有自己的样式
import React from 'react';
import AppActions from'../../actions/AppActions';
import AppStore from'../../stores/AppStore';
import './foot.less';


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
            <div className="foot">
                <a href="javascript:void(0)" className="findDog">找狗</a>
            </div>
        );
    }
});

export default Foot;
