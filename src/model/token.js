var toshihiko = require("lib/toshihiko");

var Token = toshihiko.define("token", [
    { name: "pet_id", 			column: "id", 		type: toshihiko.Type.Integer, primaryKey: true },
    { name: "token", 			column: "token", 	type: toshihiko.Type.String}
]);

module.exports = Token;
