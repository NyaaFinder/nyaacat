var toshihiko = require("lib/toshihiko");

var petPosition = toshihiko.define("pets_position", [
    { name: "id", 			column: "id", 			type: toshihiko.Type.Integer, primaryKey: true },
    { name: "rssi", 		column: "rssi", 		type: toshihiko.Type.Float },
    { name: 'pet_id', 		column: 'pet_id', 		type: toshihiko.Type.Integer },
    { name: 'lng',			column: 'lng', 			type: toshihiko.Type.Float },
    { name: 'lat',			column: 'lat',			type: toshihiko.Type.Float },
    { name: 'timestamp',	column: 'timestamp', 	type: toshihiko.Type.Integer }
]);

module.exports = petPosition;
