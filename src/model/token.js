var toshihiko = require("lib/toshihiko");

var Token = toshihiko.define("token", [
    { name: "pet_id", 			column: "id", 		type: toshihiko.TYPE.Integer, primaryKey: true },
    { name: "token", 			column: "token", 	type: toshihiko.TYPE.String}
]);

module.exports = Token;
