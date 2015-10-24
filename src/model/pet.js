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
    { name: 'pet_type', 	column: 'pet_type', 	type: toshihiko.Type.String },
    { name: 'token',		column: 'token',		type: toshihiko.Type.String }
]);

Pet.find = function(callback) {
    callback();
};

Pet.findById = function(pet_id, callback){
    Pet.where({pet_id: pet_id}).findOne(function(err, pet){
        if(err) {
            return callback(err);
        }
        return callback(null, pet);
    });
};

Pet.findByNameAndPassword = function(name, password, callback){
    Pet.where({pet_name: name, password: password}).findOne(function(err, pet){
        if(err){
            return callback(err);
        }
        return callback(null, pet);
    });
};

Pet.create = function(data, callback){
    var pet = Pet.build({
		pet_name: data.pet_name,
		password: data.password,
		mail: data.mail,
		bluetooth: data.bluetooth,
		pet_type: data.pet_type,
        token: data.token || null
	});
	pet.insert(function(err, pet) {
		if(err){
            return callback(err);
        }
        return callback(null, pet);
	}); 
};

module.exports = Pet;
