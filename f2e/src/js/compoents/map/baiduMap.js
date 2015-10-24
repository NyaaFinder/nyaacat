import $ from 'jquery';

export default function () {
        
    /*
     * 变量说明
     */
    // Point.lng 精度  Point.lat 纬度

    /*
     * 功能代码
     */
     var pointMarkArr = [];  // 用来存放转换过的 点的数组。
     var filteredData = [];
     var isFirst = true;
     var lastTimestamp = 0;
     var prePoint = null;

    // 百度地图API功能
    var map = new BMap.Map("map");

    // 转换标准坐标到百度的坐标
    var convertor = new BMap.Convertor();

    // 根据时间戳来排序
    function sortByTimestamp(a, b) {
        return a.timestamp - b.timestamp;
    }

    // 画线，连接2个点
    function drawLine(pt1, pt2) {
        var array = [];
        array.push(pt1);
        array.push(pt2);

        var polyline = new BMap.Polyline(array, {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});
        map.addOverlay(polyline);          //增加折线
    }

    // 过滤之前画过的数据
    function filterData(originArray) {
        var ret = [];

        if (isFirst) {
            if (originArray.length > 0) {
                isFirst = false;
            } else {
                map.centerAndZoom(new BMap.Point(116.403874,39.914889), 15);
            }

            return originArray;
        } else {
            originArray.forEach(function(e) {
                if (e.timestamp > lastTimestamp) {
                    ret.push(e);
                }
            });

            return ret;
        }
    }

    function formatDate(timestamp) {
        var dateObj = new Date(timestamp);
        return dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate() + " " + dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds();
    }

    // 添加起点标签
    function drawStartMark(pt, i) {
        var myIcon = new BMap.Icon("http://img.souche.com/20151024/png/f7912437d0debd5135a94afb0f607a4b.png@24w_24h.png", new BMap.Size(24, 44), { //小车图片
            imageOffset: new BMap.Size(0, 0) //图片的偏移量。为了是图片底部中心对准坐标点。
        });

        var marker = new BMap.Marker(pt, {icon: myIcon});
        var opts = {
            width : 100,     // 信息窗口宽度
            height: 40,     // 信息窗口高度
            title : "此位置出现时间",  // 信息窗口标题
        }

        var dateStr = formatDate(filteredData[i].timestamp * 1000);

        marker.addEventListener('click', function(e) {
            this.openInfoWindow(new BMap.InfoWindow(dateStr, opts));
        });
        map.addOverlay(marker);
        pointMarkArr.push(marker);
    }

    // 添加中间点标签
    function drawMiddleMark(pt, i) {
        var myIcon = new BMap.Icon("http://img.souche.com/20151024/png/a8294423514c06e64ad8d9a35df2c30b.png@10w_10h.png", new BMap.Size(10, 10), { //小车图片
            imageOffset: new BMap.Size(0, 0) //图片的偏移量。为了是图片底部中心对准坐标点。
        });

        var marker = new BMap.Marker(pt, {icon: myIcon});
        var opts = {
            width : 100,     // 信息窗口宽度
            height: 40,     // 信息窗口高度
            title : "此位置出现时间",  // 信息窗口标题
        }

        var dateStr = formatDate(filteredData[i].timestamp * 1000);

        marker.addEventListener('click', function(e) {
            this.openInfoWindow(new BMap.InfoWindow(dateStr, opts));
        });
        map.addOverlay(marker);
        pointMarkArr.push(marker);
    }

    function deleteMark () {
        var mark;
        if (pointMarkArr.length > 30) {
            mark = pointMarkArr.shift();
            map.removeOverlay(mark);
        }
    }

    // 转换坐标，然后根据转换后的坐标，来进行后续的操作
    // 返回的data.points是一个数组
    function translateCallback(data) {
        // var arr = [];
        // if (data.status === 0) {
            data.forEach(function(ee, i) {
            // data.points.forEach(function(e, i) {
                var arr = [];
                arr.push(ee);
                convertor.translate(arr, 1, 5, function (ed) {
                    var e = ed.points[0];
                    if (prePoint) {
                        drawMiddleMark(e, i);
                        deleteMark();
                        // drawLine(prePoint, e);
                        map.centerAndZoom(e, 25);
                    } else {
                        prePoint = e;
                        map.centerAndZoom(e, 25);
                        map.enableDragging();   //两秒后开启拖拽
                        // 配置拖动
                        drawStartMark(e, i);
                    }
                });
            });

        // } else {
        //     console.log('Occur error when translate gps point.');
        // }
    }


    function ajaxSuccess(data) {
        filteredData = filterData(data);
        filteredData.sort(sortByTimestamp);

        if (filteredData.length > 0) {
            lastTimestamp = filteredData[filteredData.length - 1].timestamp;
            // convertor.translate(filteredData, 1, 5, translateCallback);
            translateCallback(filteredData);
        } else {
            
        }
    }

    return {
        ajaxSuccess: ajaxSuccess
    };
}


// export default ajaxSuccess;

// var test = [{lng: 120.00015622, lat: 30.29501930, timestamp: 1445698299}];
// setInterval(function() {
//     $.ajax({
//         url: "ssh.jj.letme.repair port:2398/bluetooth?token=" + token,
//         type: "get",
//         success: ajaxSuccess
//     });

//     // test[0].lat += 0.001;
//     // test[0].timestamp += 10;
//     //
//     // ajaxSuccess( test )
//     // ssh.jj.letme.repair port:2398

// }, 5000);




// var point = new BMap.Point(120.00015622, 30.29501930);

// pointArr.push(point1);
// pointArr.push(point2);

// var point1 = new BMap.Point(120.01015622, 30.29501930);
// var point2 = new BMap.Point(120.00015622, 30.29101930);



// if (data.points.length) {
//     // 定位地图的中心点
//
//     // 画起点
//     drawStartMark(data.points[0]);
//
//     if (data.points.length > 1) {
//         // 画终点
//         drawEndMark(data.points[data.points.length - 1]);
//         // 画线运动的线
//         drawLine(data.points);
//     }
// }
//
// if (data.points.length > 2) {
//     var length = data.points.length;
//     data.points.forEach(function(ele, i) {
//         if (i !== 0 && i !== length -1) {
//             drawMiddleMark(ele);
//         }
//     });
// }


// // 添加终点标签
// function drawEndMark(pt) {
//     var myIcon = new BMap.Icon("http://img.souche.com/20151024/png/b89a9a1e21ae1f51bd517b2cfaf9c0e6.png@24w_24h.png", new BMap.Size(24, 44), { //小车图片
//         imageOffset: new BMap.Size(0, 0) //图片的偏移量。为了是图片底部中心对准坐标点。
//     });
//
//     var marker = new BMap.Marker(pt, {icon: myIcon});
//     var opts = {
//         width : 100,     // 信息窗口宽度
//         height: 40,     // 信息窗口高度
//         title : "此位置出现时间",  // 信息窗口标题
//     }
//
//     marker.addEventListener('click', function(e) {
//         this.openInfoWindow(new BMap.InfoWindow("2015-12-12 12:22:22", opts)) ;
//     });
//     map.addOverlay(marker);
// }



// file:///Users/jiqinghua/Desktop/test.html
