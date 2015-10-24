/**
 * Created by john on 15/10/19.
 */
import React from 'react';
import App from '../js/compoents/app/app.js';
import {RootInstanceProvider} from 'react-hot-loader/Injection';
import '../css/app.less';

var hotObj = React.render(
    <App></App>,
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

