/**
 * XadillaX created at 2015-10-24 14:25:30 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
var toshihiko = require("lib/toshihiko");

var Pet = toshihiko.define("pets", [
    { name: "pet_id", 		column: "pet_id", 		type: toshihiko.Type.Integer, primaryKey: true },
    { name: "pet_name", 	column: "pet_name", 	type: toshihiko.Type.String },
    { name: 'password', 	column: 'password', 	type: toshihiko.Type.String },
    { name: 'mail',			column: 'mail', 		type: toshihiko.Type.String },
    { name: 'bluetooth',	column: 'bluetooth',	type: toshihiko.Type.String },
    { name: 'pet_type', 	column: 'pet_type', 	type: toshihiko.Type.String},
    { name: 'token',		column: 'token',		type: toshihiko.Type.String}
]);

Pet.find = function(callback) {
    callback();
};


module.exports = Pet;
