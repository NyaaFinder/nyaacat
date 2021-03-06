/**
 * XadillaX created at 2015-10-24 13:21:33 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
"use strict";

global.__DOC_PATH = __dirname;
require("app-module-path").addPath(__dirname + "/src");

require("sugar");

var config = require("config");
var express = require("express");
var morgan = require("morgan");
var 色 = require("colors");
var bodyParser = require("body-parser");

var nyaa = global.nyaa = express();

var PORT = config.get("server.port");

// some nes...ry modules
require("lib/util");
require("lib/toshihiko");

nyaa.use(bodyParser.json()); // for parsing application/json
nyaa.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// load static files
nyaa.use(express.static(__dirname + "/f2e/build/", {
    dotfiles: "deny",
    lastModified: true
}));

// 跨域
nyaa.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

nyaa.use(morgan("combined"));

// load routers
require("lib/controller_loader")("");

nyaa.listen(PORT);
console.log(色.rainbow("Nyaa listened on port " + PORT + "."));


module.exports = nyaa;
