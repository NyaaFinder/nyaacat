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
        AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
    },

    _onChange:function(){

    },

    findDog: function () {
        AppActions.actionFindDog();
    },

    render: function() {

        return (
            <div className="foot">
                <div className="findDog" onClick={this.findDog}>找爱宠</div>
            </div>
        );
    }
});

export default Foot;
