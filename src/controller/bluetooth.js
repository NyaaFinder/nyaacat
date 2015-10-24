var util = require('util');
var Pet = util.getModel('pet');
var async = require('async');

module.exports = function(router) {
    router.put("/", function(req, resp) {
        var body = req.body;
        //参数校验
        if (!body) return resp.status(401).end('No body!');
        console.log(body);
        if (typeof rssi !== 'number') return resp.status(401).end('rssi type error!');
        if (typeof lng !== 'number') return resp.status(401).end('lng type error!');
        if (typeof lat !== 'number') return resp.status(401).end('lat type error!');

        async.waterfall([
        	function(next) {
        		Pet.find({
        			bluetooth : body.identifier
        		}, next);
        	},
        	function(pet, sql, next) {
        		if (!pet || !pet.length) return resp.status(404).end('Not find this pet!');
        		petPosition.build({
        			pet_id : pet.pet_id,
		        	rssi : body.rssi,
		        	lng : body.lng,
		        	lat : body.lat,
		        	timestamp : body.timestamp
        		}).save(next);
        	}
        ], function(err) {
        	if (err) return resp.status(401).end(err);
        	return resp.status(200).end();
        });
    });
};
