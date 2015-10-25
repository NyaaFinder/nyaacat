/**
 * Created by john on 15/10/24.
 */
// 一个组件是一个模块，自己带有自己的样式
import React from 'react';
import AppActions from'../../actions/AppActions';
import AppStore from'../../stores/AppStore';
import Foot from '../../compoents/foot/foot.jsx';
import Dialog from '../../compoents/dialog/dialog.jsx';

var Test = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
    },

    componentWillUnmount: function() {
    },

    render: function() {

        return (
            <Dialog/>
        );
    }
});

export default Test;
