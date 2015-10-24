var toshihiko = require("lib/toshihiko");

var petCoordinate = toshihiko.define("pets_coordinate", [
    { name: "id", 			column: "id", 			type: toshihiko.TYPE.Integer, primaryKey: true },
    { name: "pet_id", 		column: "pet_id", 		type: toshihiko.TYPE.Integer },
    { name: 'timestamp', 	column: 'timestamp', 	type: toshihiko.TYPE.Integer },
    { name: 'lng',			column: 'lng', 			type: toshihiko.TYPE.Float },
    { name: 'lat',			column: 'lat',			type: toshihiko.TYPE.Float }
]);

module.exports = petCoordinate;

