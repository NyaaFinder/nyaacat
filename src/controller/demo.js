/**
 * XadillaX created at 2015-10-24 14:59:25 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
module.exports = function(router) {
    router.get("/", function(req, resp) {
        resp.send("Hello world!");
    });

    router.get("/hello", function(req, resp) {
        resp.send("Hello again!");
    });
};
