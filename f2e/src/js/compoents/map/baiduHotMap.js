import $ from 'jquery';

export default function () {
	var map = new BMap.Map("map");          // 创建地图实例

	var convertor = new BMap.Convertor();

    var point = new BMap.Point(116.418261, 39.921984);
    map.centerAndZoom(point, 15);             // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(); // 允许滚轮缩放

    function ajaxSuccess(data) {
    	var t_arr = [];
    	data.forEach(function(ee, i) {
        // data.points.forEach(function(e, i) {
            var arr = [];
            arr.push(ee);
            convertor.translate(arr, 1, 5, function (ed) {
                var e = ed.points[0];
                t_arr.push(e);
            });
        });

        map.centerAndZoom(t_arr[0], 15);

        var heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
		map.addOverlay(heatmapOverlay);
		heatmapOverlay.setDataSet({data:t_arr,max:100});
        heatmapOverlay.show();
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
