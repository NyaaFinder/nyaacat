/**
 * Created by john on 15/10/24.
 */
// 一个组件是一个模块，自己带有自己的样式
import React from 'react';
import AppActions from'../../actions/AppActions';
import AppStore from'../../stores/AppStore';
import $ from 'jquery';
import baiduMap from './baiduMap';

import './map.less';




var Map = React.createClass({

    // chunyan 定义全局地图对象
    _map: {},

    // 定义一个全局定时器
    _interval: false,

    getInitialState: function() {
        return {};
    },

    _getPoint: function () {
        var that = this;
        $.ajax({
            url: 'http://ssh.jj.letme.repair:2398/bluetooth',
            type: 'get',
            dataType: 'json',
            data: {
            // token: localStorage.getItem('token')
                token: '3267gdsgjsydkvbnx',
                t: new Date()
            }
        })
        .done(function(json) {
            var arr = [];
            for (var i = 0; i < json.pet_coordinate.length; i++) {
                arr.push(json.pet_coordinate[i]);
            };
            that._map.ajaxSuccess(arr);
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            // console.log("complete");
        });
    },

    // chunyan 
    _onChange: function () {
        if (this._interval) {
            clearInterval(this._interval);
        }
        var that = this;
        this._getPoint();
        this._interval = setInterval(function () {
            that._getPoint();
        }, 5000);
    },

    // dom组件初始化
    componentDidMount: function() {

        // 所有非模块化的代码都在这里写
        // 
        // chunyan
        this._map = baiduMap();
        // var arr = [{"id":8,"pet_id":1,"timestamp":1445700245,"lng":120,"lat":30.29502},{"id":10,"pet_id":1,"timestamp":1445700261,"lng":120.0002,"lat":30.29502},{"id":13,"pet_id":1,"timestamp":1445700514,"lng":120.0001,"lat":30.29491},{"id":16,"pet_id":1,"timestamp":1445700523,"lng":120.0002,"lat":30.29498},{"id":17,"pet_id":1,"timestamp":1445700526,"lng":120.0002,"lat":30.29498},{"id":18,"pet_id":1,"timestamp":1445700529,"lng":120.0002,"lat":30.29503},{"id":21,"pet_id":1,"timestamp":1445700682,"lng":120.0002,"lat":30.29506},{"id":23,"pet_id":1,"timestamp":1445700798,"lng":120.0001,"lat":30.29502},{"id":25,"pet_id":1,"timestamp":1445701015,"lng":120.0002,"lat":30.29507},{"id":27,"pet_id":1,"timestamp":1445701362,"lng":119.9971,"lat":30.29889},{"id":28,"pet_id":1,"timestamp":1445701686,"lng":120.0001,"lat":30.29499},{"id":30,"pet_id":1,"timestamp":1445702502,"lng":120.0001,"lat":30.29498},{"id":32,"pet_id":1,"timestamp":1445702555,"lng":120.0001,"lat":30.295},{"id":35,"pet_id":1,"timestamp":1445702599,"lng":120.0001,"lat":30.29502},{"id":36,"pet_id":1,"timestamp":1445703348,"lng":120.0001,"lat":30.29499},{"id":38,"pet_id":1,"timestamp":1445703399,"lng":120,"lat":30.29502},{"id":41,"pet_id":1,"timestamp":1445703664,"lng":120.0001,"lat":30.29506},{"id":42,"pet_id":1,"timestamp":1445704003,"lng":120.0001,"lat":30.29499},{"id":43,"pet_id":1,"timestamp":1445704004,"lng":120.0001,"lat":30.29499},{"id":46,"pet_id":1,"timestamp":1445704005,"lng":120.00009526460366,"lat":30.294986762585665},{"id":47,"pet_id":1,"timestamp":1445704006,"lng":120.00009526460366,"lat":30.294986762585665},{"id":50,"pet_id":1,"timestamp":1445704007,"lng":120.00009526460366,"lat":30.294986762585665},{"id":51,"pet_id":1,"timestamp":1445704008,"lng":120.00009526460366,"lat":30.294986762585665},{"id":54,"pet_id":1,"timestamp":1445704009,"lng":120.00009526460366,"lat":30.294986762585665},{"id":55,"pet_id":1,"timestamp":1445704010,"lng":120.00009999999996,"lat":30.295},{"id":57,"pet_id":1,"timestamp":1445704011,"lng":120.00009999999996,"lat":30.295},{"id":60,"pet_id":1,"timestamp":1445704012,"lng":120.00009999999996,"lat":30.295},{"id":61,"pet_id":1,"timestamp":1445704013,"lng":120.00009999999996,"lat":30.295},{"id":64,"pet_id":1,"timestamp":1445704014,"lng":120.00009999999996,"lat":30.295},{"id":66,"pet_id":1,"timestamp":1445704015,"lng":120.00009999999996,"lat":30.295},{"id":67,"pet_id":1,"timestamp":1445704016,"lng":120.00009999999996,"lat":30.295},{"id":70,"pet_id":1,"timestamp":1445704017,"lng":119.99998746676955,"lat":30.294968796279985},{"id":72,"pet_id":1,"timestamp":1445704018,"lng":119.99998746676955,"lat":30.294968796279985},{"id":73,"pet_id":1,"timestamp":1445704019,"lng":119.99998746676955,"lat":30.294968796279985},{"id":75,"pet_id":1,"timestamp":1445704020,"lng":120,"lat":30.29498},{"id":77,"pet_id":1,"timestamp":1445704021,"lng":120,"lat":30.29498},{"id":79,"pet_id":1,"timestamp":1445704022,"lng":120,"lat":30.29498},{"id":81,"pet_id":1,"timestamp":1445704023,"lng":119.99998746676955,"lat":30.29492388051578},{"id":84,"pet_id":1,"timestamp":1445704024,"lng":119.99998746676955,"lat":30.29492388051578},{"id":86,"pet_id":1,"timestamp":1445704025,"lng":119.99998746676955,"lat":30.29492388051578},{"id":87,"pet_id":1,"timestamp":1445704026,"lng":120,"lat":30.29493},{"id":89,"pet_id":1,"timestamp":1445704027,"lng":120,"lat":30.29493},{"id":92,"pet_id":1,"timestamp":1445704028,"lng":120,"lat":30.29493},{"id":94,"pet_id":1,"timestamp":1445704029,"lng":120,"lat":30.29493},{"id":95,"pet_id":1,"timestamp":1445704030,"lng":120,"lat":30.29492999999995},{"id":97,"pet_id":1,"timestamp":1445704031,"lng":119.99998746676955,"lat":30.2949508299743},{"id":99,"pet_id":1,"timestamp":1445704032,"lng":119.99998746676955,"lat":30.2949508299743},{"id":101,"pet_id":1,"timestamp":1445704033,"lng":119.99998746676955,"lat":30.2949508299743},{"id":103,"pet_id":1,"timestamp":1445704034,"lng":120,"lat":30.29496},{"id":105,"pet_id":1,"timestamp":1445704035,"lng":120.00009526460366,"lat":30.294977779432823}];
        // var tmp = [];
        // for (var i = 0; i < arr.length; i++) {
        //     tmp = [];
        //     tmp.push(arr[i]);
        this._map.ajaxSuccess([]);
        // };
        
        AppStore.addChangeListener(this._onChange);
        
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
    },

    render: function() {

        return (
            <div className="map">
                <div id="map"></div>
            </div>
        );
    }
});

export default Map;
