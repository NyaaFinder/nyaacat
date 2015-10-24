/**
 * XadillaX created at 2015-10-24 16:24:05 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
"use strict";

var config = require("config");
var TX_POWER = config.get("bluetooth.txPower");
var EP = 10e-6;
var EARTH_RADIUS = 6378.137;
var EARTH_PERIMETER = 2 * Math.PI * EARTH_RADIUS;

/**
 * circleRelation
 * @param {Object} coor1 the coordinate 1
 * @param {Number} r1 the radius 1
 * @param {Object} coor2 the coordinate 2
 * @param {Number} r2 the radius 2
 * @return {Number} the result
 *
 *   + 相离：return 1
 *   + 外切：return 2
 *   + 相交：return 3
 *   + 内切：return 4
 *   + 内含：return 5
 */
function circleRelation(coor1, r1, coor2, r2) {
    var d = Math.sqrt((coor1.lat - coor2.lat) *
            (coor1.lat - coor2.lat) +
            (coor1.lng - coor2.lng) *
            (coor1.lng - coor2.lng));

    if(Math.abs(d - r1 - r2) < EP) return 2;
    if(Math.abs(d - Math.abs(r1 - r2)) < EP) return 4;
    if(d > r1 + r2) return 1;
    if(d < Math.abs(r1 - r2)) return 5;
    if(Math.abs(r1 - r2) < d && d < r1 + r2) return 3;
    return 0;
}

/**
 * calcDistanceViaRSSI
 * @param {Number} rssi the RSSI value
 * @return {Number} the distance
 */
function calcDistanceViaRSSI(rssi) {
    return Math.pow(10, (TX_POWER - rssi) / (10 * 2));
}

/**
 * calcCircleCrossCircle
 * @param {Object} coor1 the coordinate 1
 * @param {Number} r1 the radius 1
 * @param {Object} coor2 the coordinate 2
 * @param {Number} r2 the radius 2
 * @return {Array} the crocessed coordinate
 */
function calcCircleCrossCircle(coor1, r1, coor2, r2) {
    var a, b, r;
    a = coor2.lat - coor1.lat;
    b = coor2.lng - coor1.lng;
    r = (a * a + b * b + r1 * r1 - r2 * r2) / 2;

    var rp1 = { lng: 0, lat: 0 }, rp2 = { lng: 0, lat: 0 };

    if(a === 0 && b !== 0) {
        rp1.lng = rp2.lng = r / b;
        rp1.lat = Math.sqrt(r1 * r1 - rp1.lng * rp1.lng);
        rp2.lat = -rp1.lat;
    } else if(a !== 0 && b === 0) {
        rp1.lat = rp2.lat = r / a;
        rp1.lng = Math.sqrt(r1 * r1 - rp1.lat * rp2.lat);
        rp2.lng = -rp1.lng;
    } else if(a !== 0 && b !== 0) {
        var delta;
        delta = b * b * r * r - (a * a + b * b) * (r * r - r1 * r1 * a * a);
        rp1.lng = (b * r + Math.sqrt(delta)) / (a * a + b * b);
        rp2.lng =(b * r - Math.sqrt(delta)) / (a * a + b * b);
        rp1.lat = (r - b * rp1.lng) / a;
        rp2.lat = (r - b * rp2.lng) / a;
    }

    rp1.lat += coor1.lat;
    rp1.lng += coor1.lng;
    rp2.lat += coor1.lat;
    rp2.lng += coor1.lng;

    return [ rp1, rp2 ];
}

/**
 * calcFinalCoordinate
 * @param {Array} intersections the intersection coordinates
 * @return {Object} the result coordinate
 */
function calcFinalCoordinate(intersections) {
    var map = {};
    for(var i = 0; i < intersections.length; i++) {
        var lng = parseInt(intersections[i].lng);
        var lat = parseInt(intersections[i].lat);

        var str = lng + "," + lat;
        if(!map[str]) {
            map[str] = 1;
        } else {
            map[str]++;
        }
    }

    var str = "";
    for(var key in map) {
        if(!map.hasOwnProperty(key)) continue;
        if(!str) {
            str = key;
            continue;
        }

        if(map[key] > map[str]) {
            str = key;
        }
    }

    var temp = str.split(",").map(function(a) {
        a = parseInt(a);
        a -= 0.5;
        return a;
    });

    return {
        lng: temp[0],
        lat: temp[1]
    };
}

/**
 * mileToCoor
 * @param {Object} mile the mile coordinate
 * @return {Object} the coordinate
 */
var mileToCoor = exports.mileToCoor = function(mile) {
    var lngAbs = Math.abs(mile.lng);
    var latAbs = Math.abs(mile.lat);
    var newLng = lngAbs / ((EARTH_PERIMETER * 1000) / 360);
    var newLat = latAbs / ((EARTH_PERIMETER * 1000) / 360);

    return {
        lng: newLng,
        lat: newLat
    };
};

/**
 * calculateViaSeveralCoordinateAndDistance
 * @param {Array} coordinates the coordinates
 * @param {Array} distances the distances
 * @param {Function} callback the callback function
 */
function calculateViaSeveralCoordinateAndDistance(coordinates, distances) {
    // 两两计算交点
    var intersections = [];
    for(var i = 0; i < coordinates.length; i++) {
        for(var j = i + 1; j < coordinates.length; j++) {
            var relation = circleRelation(coordinates[i], distances[i],
                    coordinates[j], distances[j]);

            // 只计算外切、内切、香蕉🍌
            if(relation !== 2 && relation !== 3 && relation !== 4) continue;

            var crossedCoors = calcCircleCrossCircle(coordinates[i], distances[i],
                    coordinates[j], distances[j]);

            if(2 === relation || 4 === relation) {
                intersections.push(crossedCoors[0]);
            } else {
                Array.prototype.push.apply(intersections, crossedCoors);
            }
        }
    }

    if(!intersections.length) {
        var dlat = coordinates[0].lat - coordinates[1].lat;
        var dlng = coordinates[0].lng - coordinates[1].lng;

        var dis0 = distances[0];
        var dis1 = distances[1];

        var rate = dis0 / (dis0 + dis1);

        var lat = coordinates[0].lat + dlat * rate;
        var lng = coordinates[0].lng + dlng * rate;

        return mileToCoor({
            lat: lat,
            lng: lng
        });
    }

    var result = calcFinalCoordinate(intersections);

    // 最后换算回经纬度...
    return mileToCoor(result);
}

/**
 * calculateViaSeveralCoordinate
 * @param {Array} coordinates the coordinates
 * @param {Function} callback the callback function
 */
exports.calculateViaSeveralCoordinate = function(coordinates) {
    if(!coordinates || !coordinates.length) {
        return false;
    }

    if(coordinates.length === 1) {
        return {
            lng: coordinates[0].lng,
            lat: coordinates[0].lat
        };
    }

    if(coordinates.length === 2) {
        var dlat = coordinates[0].lat - coordinates[1].lat;
        var dlng = coordinates[0].lng - coordinates[1].lng;

        var dis0 = calcDistanceViaRSSI(coordinates[0].rssi);
        var dis1 = calcDistanceViaRSSI(coordinates[1].rssi);

        var rate = dis0 / (dis0 + dis1);

        var lat = coordinates[0].lat + dlat * rate;
        var lng = coordinates[0].lng + dlng * rate;

        return {
            lng: lng,
            lat: lat
        };
    }

    var newCoors = coordinates.map(function(coor) {
        var lng = (coor.lng / 360) * EARTH_PERIMETER * 1000;
        var lat = (coor.lat / 360) * EARTH_PERIMETER * 1000;
        return { lng: lng, lat: lat };
    });

    var distances = coordinates.map(function(coor) {
        return calcDistanceViaRSSI(coor.rssi);
    });

    return calculateViaSeveralCoordinateAndDistance(newCoors, distances);
};
