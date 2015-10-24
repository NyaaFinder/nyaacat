/**
 * XadillaX created at 2015-10-24 13:32:41 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
"use strict";

var path = require("path");

var colors = require("colors");
var del = require("del");
var gulp = require("gulp");

global.SRC_PATH = "./f2e/src/";
global.BUILD_PATH = "./f2e/build/";

require("./gulp/dev");
require("./gulp/prod");

gulp.task("build", [ "compress" ], function() {
    var dirs = [
            path.join(__dirname, "f2e/build/bower_components"),
            path.join(__dirname, "f2e/build/css"),
            path.join(__dirname, "f2e/build/js")
        ];

    del.sync(dirs);

    console.log(colors.rainbow("Built and cleaned."));
});

gulp.task("watch", function() {
    gulp.watch("./bower_components/**/*", [ "bower-components-dev" ]);
    gulp.watch("./f2e/src/views/**/*.jade", [ "jade-dev" ]);
    gulp.watch("./f2e/src/assets/less/**/*.less", [ "less-dev" ]);
    gulp.watch("./f2e/src/assets/js/**/*.js", [ "js-dev" ]);
    gulp.watch("./f2e/src/assets/images/**/*", [ "image" ]);
});
