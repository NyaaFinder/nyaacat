/**
 * XadillaX created at 2015-10-24 14:25:30 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
var toshihiko = require("lib/toshihiko");

var Demo = toshihiko.define("demo", [
    { name: "id", column: "id", type: toshihiko.TYPE.String, primaryKey: true },
    { name: "demo", column: "demo", type: toshihiko.TYPE.Integer }
]);

Demo.test = function(callback) {
    callback();
};

module.exports = Demo;
