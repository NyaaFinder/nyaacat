/**
 * XadillaX created at 2015-10-22 18:12:30 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();

var IMG_SRC = "./f2e/src/assets/images/";
var IMG_DEST = "./f2e/build/images/";

gulp.task("image", function() {
    return gulp.src(IMG_SRC + "**/*.{jpg,gif,png,svg}")
        .pipe(gulp.dest(IMG_DEST))
        .pipe(plugins.size());
});
