/**
 * XadillaX created at 2015-10-22 14:45:07 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
"use strict";

var gulp = require("gulp");
var colors = require("colors");

require("./bower_dev");
require("./less");
require("./js");
require("./jade");
require("./images");

gulp.task("build-dev", [ "bower-components-dev", "less-dev", "js-dev", "jade-dev", "image" ], function() {
    console.log(colors.rainbow("Built."));
});
