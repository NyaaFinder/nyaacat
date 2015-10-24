/**
 * XadillaX created at 2015-10-24 14:42:50 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
var path = require("path");
var fs = require("fs");

var express = require("express");

var ROOT = global.__DOC_PATH + "/src/controller/";

function loadController(root, m) {
    var router = express.Router({
        caseSensitive: true
    });

    m(router);

    global.nyaa.use(root.substr(0, root.length - 3), router);
}

function load(file) {
    var directory = path.join(ROOT, file);
    var filenames = fs.readdirSync(directory);

    for(var i = 0; i < filenames.length; i++) {
        var stat = fs.statSync(directory + "/" + filenames[i]);

        if(stat.isDirectory()) {
            load(file + "/" + filenames[i]);
        } else {
            if(filenames[i].endsWith(".js")) {
                loadController(file + "/" + filenames[i],
                        require(directory + "/" + filenames[i]));
            }
        }      
    }
}

module.exports = load;
