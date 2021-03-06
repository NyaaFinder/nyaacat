// 一个组件是一个模块，自己带有自己的样式
import React from 'react';
import AppActions from'../../actions/AppActions';
import AppStore from'../../stores/AppStore';
import Socket from 'socket.io-client';
import Dialog from '../dialog/dialog.jsx';
import Login from '../dialog/login.jsx';
import Foot from '../foot/foot.jsx';
import Head from '../head/head.jsx';
import Map from '../map/map.jsx';

var ReactPropTypes = React.PropTypes;

function getStateFromStores() {
    return {};
}

var App = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
    },

    componentWillUnmount: function() {
    },


    render: function() {

        return (
            <div className="app">
                <Head/>
                <Map/>
                <Foot/>
                <Dialog/>
            </div>
        );
    }
});

export default App;
