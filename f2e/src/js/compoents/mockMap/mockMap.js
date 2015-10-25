/**
 * Created by john on 15/10/25.
 */
// 一个组件是一个模块，自己带有自己的样式
import React from 'react';
import AppActions from'../../actions/AppActions';
import AppStore from'../../stores/AppStore';
import '../map/map.less';

var mockMap = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
    },

    componentWillUnmount: function() {

    },

    render: function() {

        return (
            <div className="mock">
                <img id="mock" src="../mock.png" />
            </div>
        );
    }
});

export default mockMap;
