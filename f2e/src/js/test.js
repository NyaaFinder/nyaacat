/**
 * Created by john on 15/10/19.
 */
import React from 'react';
import Test from '../js/compoents/test/test.jsx';
import {RootInstanceProvider} from 'react-hot-loader/Injection';
import '../css/app.less';

var hotObj = React.render(
    <Test></Test>,
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

