/**
 * XadillaX created at 2015-10-24 13:21:33 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
"use strict";

global.__DOC_PATH = __dirname;
require("app-module-path").addPath(__dirname + "/src");

var config = require("config");
var express = require("express");
var 色 = require("colors");

var nyaa = express();

var PORT = config.get("server.port");

nyaa.use(express.static(__dirname + "/f2e/build/", {
    dotfiles: "deny",
    lastModified: true
}));

nyaa.listen(PORT);
console.log(色.rainbow("Yuuka listened on port " + PORT + "."));
