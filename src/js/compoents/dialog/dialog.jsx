// 一个组件是一个模块，自己带有自己的样式
import React from 'react';
import AppActions from'../../actions/AppActions';
import AppStore from'../../stores/AppStore';
import Login from './login.jsx';
import Register from './register.jsx';
import './dialog.less';


var Dialog = React.createClass({

    getInitialState: function() {
        return {
            isLogin:true
        };
    },

    componentDidMount: function() {
    },

    componentWillUnmount: function() {
    },

    renderItem:function(){
      if(this.state.isLogin){
          return <Login/>
      }else{
          return <Register/>
      }
    },

    render: function() {

        return (
            <div className="dialog">
                {this.renderItem()}
            </div>
        );
    }

});

export default Dialog;
