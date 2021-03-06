var toshihiko = require("lib/toshihiko");
var util = require("util");
var coordinator = require("lib/coordinator");

var PetCoordinate = toshihiko.define("pets_coordinate", [
    { name: "id", column: "id", type: toshihiko.Type.Integer, primaryKey: true },
    { name: "pet_id", column: "pet_id", type: toshihiko.Type.Integer },
    { name: "timestamp", column: "timestamp", type: toshihiko.Type.Integer },
    { name: "lng", column: "lng", type: toshihiko.Type.Float },
    { name: "lat", column: "lat", type: toshihiko.Type.Float }
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
        //timestamp: timestamp
        timestamp: {
            ">=": timestamp - 2,
            "<=": timestamp + 2
        }
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
                    if(err.message.indexOf("Duplicate") > -1 && !notFirstTime) {
                        return self.calculateCoordinate(petId, timestamp, callback, true);
                    }

                    if(err.message.indexOf("No data changed") > -1) {
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
