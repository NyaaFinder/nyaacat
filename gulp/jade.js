/**
 * XadillaX created at 2015-10-22 12:50:18 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
"use strict";

var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();

var VIEW_SRC_PATH = SRC_PATH + "views/"; // jshint ignore:line
var VIEW_BUILD_PATH = BUILD_PATH; // jshint ignore:line

gulp.task("jade-dev", function() {
    return gulp.src(VIEW_SRC_PATH + "**/*.jade")
        .pipe(plugins.jade({
            pretty: true
        }))
        .pipe(gulp.dest(VIEW_BUILD_PATH))
        .pipe(plugins.size());
});
