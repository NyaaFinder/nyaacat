/**
 * XadillaX created at 2015-10-24 14:03:42 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
var config = require("config");
var T = require("toshihiko");

// create a toshihiko instance...
var toshihiko = new T.Toshihiko(
        config.mysql.database,
        config.mysql.username,
        config.mysql.password,
        config.mysql);

toshihiko.Type = T.Type;

module.exports = toshihiko;
