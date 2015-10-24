var toshihiko = require("lib/toshihiko");
var util = require("util");
var coordinator = require("lib/coordinator");

var PetCoordinate = toshihiko.define("pets_coordinate", [
    { name: "id", column: "id", type: toshihiko.TYPE.Integer, primaryKey: true },
    { name: "pet_id", column: "pet_id", type: toshihiko.TYPE.Integer },
    { name: "timestamp", column: "timestamp", type: toshihiko.TYPE.Integer },
    { name: "lng", column: "lng", type: toshihiko.TYPE.Float },
    { name: "lat", column: "lat", type: toshihiko.TYPE.Float }
]);

/**
 * calculateCoordinate
 * @param {Number} petId the pet id
 * @param {Number} timestamp the timestamp
 * @param {Function} callback the callback function
 */
PetCoordinate.calculateCoordinate = function(petId, timestamp, callback) {
    var self = this;
    var notFirstTime = !!arguments[3];

    var PetPosition = util.getModel("PetPosition");
    PetPosition.where({
        "pet_id": petId,
        timestamp: timestamp
    }).find(function(err, positions) {
        if(err) return callback(err);
        if(!positions || !positions.length) callback();

        var pos = coordinator.calculateViaSeveralCoordinate(positions);
        self.where({
            "pet_id": petId,
            timestamp: timestamp
        }).findOne(function(err, coor) {
            if(err) return callback(err);
            if(!coor) {
                coor = self.build({
                    "pet_id": petId,
                    timestamp: timestamp,
                    lng: pos.lng,
                    lat: pos.lat
                });
            } else {
                coor.lng = pos.lng;
                coor.lat = pos.lat;
            }

            coor.save(function(err, coor) {
                if(err) {
                    if(err.indexOf("Duplicate") > -1 && !notFirstTime) {
                        return self.calculateCoordinate(petId, timestamp, callback, true);
                    }

                    if(err.indexOf("No data changed") > -1) {
                        return callback(undefined, coor);
                    }

                    return callback(err);
                }

                callback(undefined, coor);
            });
        });
    });
};

module.exports = PetCoordinate;
