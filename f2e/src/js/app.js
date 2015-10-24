/**
 * Created by john on 15/10/19.
 */
import React from 'react';
import Demo from './compoents/demo/demo.jsx';
import {RootInstanceProvider} from 'react-hot-loader/Injection';

var hotObj = React.render(
    <div className="time">
        <Demo name="入口1-pc端"/>
    </div>,
    document.getElementById('app')
);

// 生产环境注释掉
if(module.hot){
    RootInstanceProvider.injectProvider({
        getRootInstances:function(){
            return [hotObj];
        }
    });
}

