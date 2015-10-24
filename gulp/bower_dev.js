/**
 * XadillaX created at 2015-10-22 13:20:33 With ♥
 *
 * Copyright (c) 2015 Souche.com,all rights
 * reserved.
 */
"use strict";

var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();

var BOWER_SRC = "./bower_components/";
var BOWER_DEST = "./f2e/build/bower_components/";

gulp.task("bcd-css", function() {
    return gulp.src(BOWER_SRC + "**/*.css")
        .pipe(gulp.dest(BOWER_DEST))
        .pipe(plugins.size());
});

gulp.task("bcd-js", function() {
    return gulp.src(BOWER_SRC + "**/*.js")
        .pipe(gulp.dest(BOWER_DEST))
        .pipe(plugins.size());
});

gulp.task("bcd-fonts", function() {
    return gulp.src(BOWER_SRC + "**/*.{eot,svg,ttf,woff,woff2}")
        .pipe(gulp.dest(BOWER_DEST))
        .pipe(plugins.size());
});

gulp.task("bower-components-dev", [ "bcd-js", "bcd-css", "bcd-fonts" ]);
