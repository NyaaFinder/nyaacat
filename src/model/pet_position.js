var toshihiko = require("lib/toshihiko");

var petPosition = toshihiko.define("pets_position", [
    { name: "id", 			column: "id", 			type: toshihiko.TYPE.Integer, primaryKey: true },
    { name: "rssi", 		column: "rssi", 		type: toshihiko.TYPE.Float },
    { name: 'pet_id', 		column: 'pet_id', 		type: toshihiko.TYPE.Integer },
    { name: 'lng',			column: 'lng', 			type: toshihiko.TYPE.Float },
    { name: 'lat',			column: 'lat',			type: toshihiko.TYPE.Float },
    { name: 'timestamp',	column: 'timestamp', 	type: toshihiko.TYPE.Integer}
]);

module.exports = petPosition;
