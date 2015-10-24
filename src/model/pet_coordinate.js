var toshihiko = require("lib/toshihiko");
var util = require("util");
var coordinator = require("lib/coodinator");

var PetCoordinate = toshihiko.define("pets_coordinate", [
    { name: "id", column: "id", type: toshihiko.TYPE.Integer, primaryKey: true },
    { name: "pet_id", column: "pet_id", type: toshihiko.TYPE.Integer },
    { name: "timestamp", column: "timestamp", type: toshihiko.TYPE.Integer },
    { name: "lng", column: "lng", type: toshihiko.TYPE.Float },
    { name: "lat", column: "lat", type: toshihiko.TYPE.Float }
]);

PetCoordinate.calculateCoordinate = function(petId, timestamp, callback) {
    var PetPosition = util.getModel("PetPosition");
    PetPosition.where({
        "pet_id": petId,
        timestamp: timestamp
    }).find(function(err, positions) {
        if(err) return callback(err);
    });
};

module.exports = PetCoordinate;
