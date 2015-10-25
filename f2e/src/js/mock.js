/**
 * Created by john on 15/10/19.
 */
import React from 'react';
import Mock from '../js/compoents/app/mock.js';
// import {RootInstanceProvider} from 'react-hot-loader/Injection';
import '../css/app.less';

var hotObj = React.render(
    <Mock></Mock>,
    document.getElementById('app')
);

// 生产环境注释掉
// if(module.hot){
//     RootInstanceProvider.injectProvider({
//         getRootInstances:function(){
//             return [hotObj];
//         }
//     });
// }

