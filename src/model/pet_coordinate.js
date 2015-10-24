var toshihiko = require("lib/toshihiko");

var petCoordinate = toshihiko.define("pets_coordinate", [
    { name: "id", 			column: "id", 			type: toshihiko.Type.Integer, primaryKey: true },
    { name: "pet_id", 		column: "pet_id", 		type: toshihiko.Type.Integer },
    { name: 'timestamp', 	column: 'timestamp', 	type: toshihiko.Type.Integer },
    { name: 'lng',			column: 'lng', 			type: toshihiko.Type.Float },
    { name: 'lat',			column: 'lat',			type: toshihiko.Type.Float }
]);

module.exports = petCoordinate;

