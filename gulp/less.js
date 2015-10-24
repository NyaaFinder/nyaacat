/**
 * XadillaX created at 2015-10-22 14:18:51 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
"use strict";

var path = require("path");

var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();

var LESS_SRC_PATH = SRC_PATH + "assets/less/"; // jshint ignore:line
var LESS_BUILD_PATH = BUILD_PATH + "css/"; // jshint ignore:line

gulp.task("less-dev", function() {
    return gulp.src(LESS_SRC_PATH + "**/*.less")
        .pipe(plugins.less({
            paths: [
                path.join(__dirname, "../f2e/src/assets/less", "includes")
            ]
        }))
        .pipe(gulp.dest(LESS_BUILD_PATH))
        .pipe(plugins.size());
});
