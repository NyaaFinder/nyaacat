/**
 * XadillaX created at 2015-10-24 14:25:30 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
var toshihiko = require("lib/toshihiko");

var Pet = toshihiko.define("pets", [
    { name: "pet_id", 		column: "pet_id", 		type: toshihiko.TYPE.Integer, primaryKey: true },
    { name: "pet_name", 	column: "pet_name", 	type: toshihiko.TYPE.String },
    { name: 'password', 	column: 'password', 	type: toshihiko.TYPE.String },
    { name: 'mail',			column: 'mail', 		type: toshihiko.TYPE.String },
    { name: 'bluetooth',	column: 'bluetooth',	type: toshihiko.TYPE.String },
    { name: 'pet_type', 	column: 'pet_type', 	type: toshihiko.TYPE.String}
]);

Pet.find = function(callback) {
    callback();
};


module.exports = Pet;
