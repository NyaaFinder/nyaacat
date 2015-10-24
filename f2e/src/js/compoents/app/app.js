// 一个组件是一个模块，自己带有自己的样式
import React from 'react';
import AppActions from'../../actions/AppActions';
import AppStore from'../../stores/AppStore';
import Socket from 'socket.io-client';
import Login from '../dialog/login.jsx';

var ReactPropTypes = React.PropTypes;

function getStateFromStores() {
    return {};
}

var App = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
    },


    render: function() {

        return (
            <div className="app">
                <Login/>
            </div>
        );
    }
});

export default App;
