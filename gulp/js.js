/**
 * XadillaX created at 2015-10-22 16:47:20 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
"use strict";

var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();

var JS_SRC = "./f2e/src/assets/js/";
var JS_DEST = "./f2e/build/js/";

gulp.task("js-dev", function() {
    return gulp.src(JS_SRC + "**/*.js")
        .pipe(gulp.dest(JS_DEST))
        .pipe(plugins.size());
});
