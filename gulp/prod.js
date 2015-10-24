/**
 * XadillaX created at 2015-10-22 14:44:27 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
"use strict";

var BOOTSTRAP_SRC = "./f2e/build/bower_components/bootstrap/";
var BOOTSTRAP_DEST = "./f2e/build/dist/";

var gulp = require("gulp");
var plugins = require("gulp-load-plugins")({
    rename: {
        "minify-html": "minifyHtml",
        "rev-replace": "revReplace"
    }
});

require("./dev");

gulp.task("bootstrap-fonts", [ "build-dev" ], function() {
    return gulp.src(BOOTSTRAP_SRC + "/dist/fonts/*.{eot,svg,ttf,woff,woff2}")
        .pipe(gulp.dest(BOOTSTRAP_DEST + "fonts/"))
        .pipe(plugins.size());
});

gulp.task("compress-scripts", [ "build-dev" ], function() {
    var assets = plugins.useref.assets({
        searchPath: "./f2e/build/"
    });

    return gulp.src("./f2e/build/**/*.html")
        .pipe(assets)
        .pipe(plugins.if("*.js", plugins.uglify()))
        .pipe(plugins.if("*.css", plugins.csso()))
        .pipe(plugins.rev())
        .pipe(assets.restore())
        .pipe(plugins.useref())
        .pipe(plugins.revReplace())
        .pipe(gulp.dest("./f2e/build/"))
        .pipe(plugins.size());
});

gulp.task("compress", [ "compress-scripts", "bootstrap-fonts" ], function() {
    return gulp.src("./f2e/build/**/*.html")
        .pipe(plugins.minifyHtml({ spare: true }))
        .pipe(gulp.dest("./f2e/build"))
        .pipe(plugins.size());
});
